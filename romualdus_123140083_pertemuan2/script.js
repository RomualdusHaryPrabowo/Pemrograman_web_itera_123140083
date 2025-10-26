class WishlistItem {
  constructor(no, item, year) {
    this.no = no;
    this.item = item;
    this.year = year;
  }

  render() {
    return `
      <tr>
        <td>${this.no}</td>
        <td>${this.item}</td>
        <td>${this.year}</td>
        <td>
          <button type="button" onclick="editWishlist(${this.no})">Edit Wishlist</button>
          <button type="button" onclick="deleteWishlist(${this.no})">Delete</button>
        </td>
      </tr>
    `;
  }
}

const wishlistTableBody = document.getElementById('wishlistTableBody');
const messageDiv = document.getElementById('message');
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

const renderWishlist = () => {
  wishlistTableBody.innerHTML = '';
  wishlist.forEach(item => {
    const w = new WishlistItem(item.no, item.item, item.year);
    wishlistTableBody.innerHTML += w.render();
  });
};

const showMessage = (msg) => {
  messageDiv.textContent = msg;
  setTimeout(() => messageDiv.textContent = '', 2000);
};

const wishlistForm = document.getElementById('wishlistForm');
wishlistForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const no = document.getElementById('itemId').value;
  const item = document.getElementById('item').value;
  const year = document.getElementById('year').value;

  if (no) {
    const index = wishlist.findIndex(w => w.no == no);
    if (index !== -1) {
      wishlist[index].item = item;
      wishlist[index].year = year;
      showMessage('Wishlist berhasil diperbarui!');
    }
  } else {
    const no = wishlist.length ? wishlist[wishlist.length - 1].no + 1 : 1;
    wishlist.push({ no, item, year });
    showMessage('Wishlist berhasil ditambahkan!');
  }

  await saveWishlist();
  renderWishlist();
  wishlistForm.reset();
  document.getElementById('itemId').value = '';
});

window.editWishlist = (no) => {
  const item = wishlist.find(w => w.no === no);
  if (item) {
    document.getElementById('itemId').value = item.no;
    document.getElementById('item').value = item.item;
    document.getElementById('year').value = item.year;
  }
};

window.deleteWishlist = async (no) => {
  wishlist = wishlist.filter(w => w.no !== no);
  await saveWishlist();
  renderWishlist();
  showMessage('Wishlist berhasil dihapus!');
};

const saveWishlist = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      resolve();
    }, 200);
  });
};

renderWishlist();
