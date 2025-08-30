import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Firebase configuration - You need to replace this with your actual config
// To get this config:
// 1. Go to https://console.firebase.google.com/
// 2. Click "Create a project" or select existing project
// 3. Name it "horticultural-club" 
// 4. Go to Project Settings (gear icon)
// 5. Scroll to "Your apps" → "Add app" → Web app
// 6. Copy the config object from there
const firebaseConfig = {
  apiKey: "AIzaSyBI2pPM2CI_acWy2Ur9WTZBNmIjJ0bHmYQ",
  authDomain: "horticulture-club-5b5d2.firebaseapp.com",
  projectId: "horticulture-club-5b5d2",
  storageBucket: "horticulture-club-5b5d2.firebasestorage.app",
  messagingSenderId: "1042986974163",
  appId: "1:1042986974163:web:90824001433dac196e4d26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Helper function to generate email from credentials
function generateEmail(initial, month, cardName) {
  // Create a unique email format: initial + month + cardname + @horticulture.local
  const cleanCardName = cardName.replace(/\s+/g, '').toLowerCase();
  return `${initial.toLowerCase()}${month.toLowerCase()}${cleanCardName}@horticulture.local`;
}

// Helper function to generate document ID for Firestore
function generateMemberId(initial, month, cardName) {
  return `${initial}-${month}-${cardName}`;
}

// Check what plants are already taken for a given initial + month combination
export async function getAvailableCards(initial, month, allPlants) {
  try {
    const membersRef = collection(db, 'members');
    const q = query(
      membersRef, 
      where('initial', '==', initial), 
      where('month', '==', month)
    );
    
    const querySnapshot = await getDocs(q);
    const takenPlants = [];
    
    querySnapshot.forEach((doc) => {
      const memberData = doc.data();
      // Handle both old cardName and new plantName for backward compatibility
      const plantName = memberData.plantName || memberData.cardName;
      if (plantName) {
        takenPlants.push(plantName);
      }
    });
    
    // Return plants that haven't been taken yet
    return allPlants.filter(plant => !takenPlants.includes(plant.name) && !takenPlants.includes(plant.commonName));
  } catch (error) {
    console.error('Error checking available plants:', error);
    throw error;
  }
}

// Register a new member with their plant ally
export async function registerMember(initial, month, plantName, commonName, plantId) {
  try {
    const email = generateEmail(initial, month, commonName);
    const memberId = generateMemberId(initial, month, commonName);
    
    // Check if this combination already exists
    const memberDoc = await getDoc(doc(db, 'members', memberId));
    if (memberDoc.exists()) {
      throw new Error('This combination of initial, month, and card is already taken.');
    }
    
    // Create user with email/password (we'll use a default password)
    const password = 'horticultureclub2025'; // Simple default password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Store member data in Firestore
    await setDoc(doc(db, 'members', memberId), {
      initial,
      month,
      plantName,
      commonName,
      plantId,
      email,
      joinDate: new Date().toISOString(),
      userId: userCredential.user.uid
    });
    
    return { success: true, memberId, email };
  } catch (error) {
    console.error('Error registering member:', error);
    
    // Handle ad blocker interference
    if (error.message.includes('ERR_BLOCKED_BY_CLIENT') || 
        error.message.includes('network') || 
        error.code === 'unavailable') {
      const newError = new Error('Registration may be blocked by an ad blocker or browser extension. Please try disabling your ad blocker for this site, or the registration may have still succeeded - try logging in.');
      newError.code = 'adblocker-interference';
      throw newError;
    }
    
    throw error;
  }
}

// Login a member
export async function loginMember(initial, month, plantName) {
  try {
    const email = generateEmail(initial, month, plantName);
    const password = 'horticultureclub2025'; // Same default password
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get member data from Firestore
    const memberId = generateMemberId(initial, month, plantName);
    const memberDoc = await getDoc(doc(db, 'members', memberId));
    
    if (!memberDoc.exists()) {
      throw new Error('Member data not found');
    }
    
    return { 
      success: true, 
      user: userCredential.user, 
      memberData: memberDoc.data() 
    };
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Logout current user
export async function logoutMember() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Get current user's member data
export async function getCurrentMemberData() {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    
    // Find member document by userId
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting member data:', error);
    throw error;
  }
}

// Listen to authentication state changes
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Export auth and db for direct use if needed
export { auth, db };