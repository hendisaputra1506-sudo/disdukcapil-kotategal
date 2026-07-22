// Utility untuk pembersihan sisa-sisa token di localStorage jika pernah tersimpan sebelumnya
export function clearLegacyLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
  }
}
