import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc, writeBatch }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const cfg = window.SITE_CONFIG || {};
export const enabled = !!(cfg.firebase && cfg.firebase.apiKey && cfg.firebase.projectId);
export const adminEmail = (cfg.adminEmail || '').toLowerCase();

let db, auth;
if (enabled) {
  const app = initializeApp(cfg.firebase);
  db = getFirestore(app);
  auth = getAuth(app);
}

export async function list(col) {
  const s = await getDocs(collection(db, col));
  return s.docs.map(d => ({ ...d.data(), id: d.id }));
}
export const save = (col, id, data) => setDoc(doc(db, col, id), data);
export const remove = (col, id) => deleteDoc(doc(db, col, id));

export async function seededCols() {
  const s = await getDoc(doc(db, 'meta', 'seeded'));
  return s.exists() ? (s.data().cols || []) : [];
}

export async function seed(defaults) {
  for (const [col, items] of Object.entries(defaults)) {
    for (let i = 0; i < items.length; i += 400) {
      const b = writeBatch(db);
      items.slice(i, i + 400).forEach(({ id, ...rest }) => b.set(doc(db, col, id), rest));
      await b.commit();
    }
  }
  await setDoc(doc(db, 'meta', 'seeded'), { cols: Object.keys(defaults) });
}

export async function exportAll(cols) {
  const out = {};
  for (const c of cols) out[c] = await list(c);
  return out;
}

export const login = () => signInWithPopup(auth, new GoogleAuthProvider());
export const logout = () => signOut(auth);
export const onUser = cb => onAuthStateChanged(auth, cb);
