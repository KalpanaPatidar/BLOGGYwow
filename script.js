
function searchGoogle() {
    const inputElement = document.getElementById('search-input');
    const query = inputElement.value;
    if (query) {
        inputElement.value = ''; 
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
}

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchGoogle();
    }
});


function openRecipePage(url) {
    window.location.href = url;
}

function navigateTo(url) {
    window.location.href = url;
}

function navigateTo(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const savedStory = localStorage.getItem('yourStory');
    if (savedStory) {
        document.getElementById('your-story-img').src = savedStory;
    }
});

function toggleLike(element) {
    element.classList.toggle('liked');
}

function showUploadContainer() {
    document.getElementById('upload-container').style.display = 'block';
}

function closeUploadContainer() {
    document.getElementById('upload-container').style.display = 'none';
}

function uploadStory() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;
            document.getElementById('your-story-img').src = imgSrc;
            localStorage.setItem('yourStory', imgSrc);
        }
        reader.readAsDataURL(file);
        closeUploadContainer();
    }
}

function uploadProfilePic(event) {
    event.stopPropagation();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgSrc = e.target.result;
                document.getElementById('your-story-card').querySelector('.profile-pic').src = imgSrc;
                localStorage.setItem('profilePic', imgSrc);
            }
            reader.readAsDataURL(file);
        }
    }
    fileInput.click();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
        document.getElementById('your-story-card').querySelector('.profile-pic').src = savedProfilePic;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const addToStoryIcon = document.querySelector('.add-to-story-icon');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    addToStoryIcon.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            document.querySelector('.upload-container').style.display = 'none';
        }
    });

    
    const deleteIcons = document.querySelectorAll('.delete-icon');
    deleteIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            const storyDiv = this.closest('.story-modal-content');
            storyDiv.remove();
        });
    });
});



function deleteStory(event) {
    event.stopPropagation();
    const defaultStory = "https://storage.googleapis.com/a1aa/image/MSJSWgELo73w3tTHFFUFCdepdLWEgYHsYTEamma_7MA.jpg";
    document.getElementById('your-story-img').src = defaultStory;
    localStorage.removeItem('yourStory');
}

function openStoryModal(imgId, name, profilePic) {
    const imgSrc = document.getElementById(imgId).src;
    document.getElementById('modal-story-img').src = imgSrc;
    document.getElementById('modal-story-name').innerText = name;
    document.getElementById('modal-profile-pic').src = profilePic;
    document.getElementById('story-modal').style.display = 'flex';
}

function closeStoryModal() {
    document.getElementById('story-modal').style.display = 'none';
}
function clearBlogInputs() {
    document.getElementById('blog-name').value = '';
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-content').value = '';
    document.getElementById('blog-image-file').value = '';
}


function deleteBlog(blogPost) {
    const blogPostContainer = document.getElementById('blog-post-container');
    blogPostContainer.removeChild(blogPost);

    // Update localStorage
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const updatedBlogPosts = blogPosts.filter(post => post.title !== blogPost.querySelector('h1').textContent);
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogPosts));
}

function postBlog() {
    const name = document.getElementById('blog-name').value;
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;
    const imageFile = document.getElementById('blog-image-file').files[0];

    if (name && title && content && imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const blogPostContainer = document.getElementById('blog-post-container');
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';

            const blogName = document.createElement('h2');
            blogName.textContent = name;

            const blogImage = document.createElement('img');
            blogImage.src = e.target.result;
            blogImage.alt = 'Blog post image';

            const blogTitle = document.createElement('h1');
            blogTitle.textContent = title;

            const blogContent = document.createElement('p');
            blogContent.textContent = content;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteBlog(blogPost);
            };

            blogPost.appendChild(blogName);
            blogPost.appendChild(blogImage);
            blogPost.appendChild(blogTitle);
            blogPost.appendChild(blogContent);
            blogPost.appendChild(deleteButton);

            blogPostContainer.appendChild(blogPost);

            // Save the blog post to localStorage
            const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            blogPosts.push({ name, title, content, image: e.target.result });
            localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

            // Clear the input fields after posting
            clearBlogInputs();
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please fill in all fields and upload an image.');
    }
}

function loadBlogPosts() {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    if (blogPosts.length > 0) {
        const blogPostContainer = document.getElementById('blog-post-container');
        blogPostContainer.innerHTML = '';
        blogPosts.forEach(post => {
            const blogPost = document.createElement('div');
            blogPost.className = 'blog-post';

            const blogName = document.createElement('h2');
            blogName.textContent = post.name;

            const blogImage = document.createElement('img');
            blogImage.src = post.image;
            blogImage.alt = 'Blog post image';

            const blogTitle = document.createElement('h1');
            blogTitle.textContent = post.title;

            const blogContent = document.createElement('p');
            blogContent.textContent = post.content;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteBlog(blogPost);
            };

            blogPost.appendChild(blogName);
            blogPost.appendChild(blogImage);
            blogPost.appendChild(blogTitle);
            blogPost.appendChild(blogContent);
            blogPost.appendChild(deleteButton);

            blogPostContainer.appendChild(blogPost);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);

document.addEventListener('DOMContentLoaded', function() {
    const addToStoryIcon = document.querySelector('.add-to-story-icon');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    addToStoryIcon.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            document.querySelector('.upload-container').style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-image');
    var captionText = document.getElementById('caption');

    var storyCards = document.querySelectorAll('.story-card img');
    storyCards.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    var closeModal = function() {
        modal.style.display = 'none';
    };

    document.querySelector('.close').addEventListener('click', closeModal);
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-image');
    var captionText = document.getElementById('caption');

    var storyCards = document.querySelectorAll('.story-card img');
    storyCards.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    var closeModal = function() {
        modal.style.display = 'none';
    };

    document.querySelector('.close').addEventListener('click', closeModal);
});


function deleteStory(event) {
    event.stopPropagation(); 
    var storyCard = event.target.closest('.story-card');
    var storyImg = storyCard.querySelector('img');
    storyImg.src = 'path/to/default-image.jpg'; 
}

