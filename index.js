const getPosts = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    const data = await response.json();
    for (const post of data) {
        const $post = document.createElement('div');
        $post.className = 'post'
        $post.id = `post-${post.id}`
        $post.innerHTML = `
            <div class="body">${post.body}</div>
            <div class="buttons">
                <button class="author" onclick="showAuthor(${post.userId}, '${$post.id}')">Author</button>
                <button class="comment" onclick="showComments(${post.id}, '${$post.id}')">Comment</button>
            </div>
            <div class="author"></div>
            <div class="comments"></div>
        `
        $post.style.fontSize = '22px'
        document.body.appendChild($post);
    };
}

const showAuthor = async (userId, cardId) => {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    const response = await fetch(url);
    const users = await response.json();
    const author = users.find(x => x.id === userId)
    const $autor = document.querySelector(`#${cardId} > .author`); // #post-1 > .author
    $autor.innerText = author.name
};

const showComments = async (postId, cardId) => {
    const url = 'https://jsonplaceholder.typicode.com/comments';
    const response = await fetch(url);
    const comments = await response.json();
    const postComments = comments.filter(x => x.postId === postId)
    for (const comment of postComments) {
        const $comments = document.querySelector(`#${cardId} > .comments`);
        const $comment = document.createElement('div');
        $comment.innerText = comment.body
        $comment.className = 'comment'
        $comments.appendChild($comment)
    }
}

getPosts()


