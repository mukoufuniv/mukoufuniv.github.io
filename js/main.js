const diaryList = document.getElementById("diary-list");

posts.forEach(function(post) {

    const htmlCode = `
        <article class="diary-entry">
            <div class="diary-date">${post.date}</div>
            <h3 class="diary-title">${post.title}</h3>
            <p>${post.content}</p>
        </article>
        <hr>
    `;

    diaryList.innerHTML += htmlCode;

});