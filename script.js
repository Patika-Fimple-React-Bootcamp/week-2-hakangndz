const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
let allPosts = [];

// Fetching posts
async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  allPosts = posts; // Store all posts for filtering
  console.log(posts);
  displayPosts(posts);
}

// Display Posts
function displayPosts(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
      <h3 class="title">${post.title}</h3>
      <p>${post.body}</p>
      <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
    `;
    postCard.addEventListener("click", () => openModal(post.id));
    postsContainer.appendChild(postCard);
  });
}

// Delete Post
function deletePost(postId) {
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (confirmed) {
    const updatedPosts = allPosts.filter((post) => post.id !== postId);
    displayPosts(updatedPosts);
  }
}

// Open Modal with Comments
async function openModal(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const comments = await response.json();

  const modalContent = document.createElement("div");

  modalContent.classList.add("modal-content");
  comments.forEach((comment) => {
    modalContent.innerHTML += `<p>${comment.body}</p>`;
  });

  modal.innerHTML = "";
  modal.appendChild(modalContent);
  modal.style.display = "flex";
}

// Close Modal
modal.addEventListener("click", () => (modal.style.display = "none"));

// Search functionality
searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.body.toLowerCase().includes(searchTerm)
  );
  displayPosts(filteredPosts);
}

// Initial fetch and display
fetchPosts();
