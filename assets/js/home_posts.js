{
    // to submit new post form data using AJAX...
    function createPost(){
        let newPostForm = $('#post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            //make manual post request via ajax
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    console.log(data.post);
                    // add post to the top of the post list
                    let newPost = postDOM(data.post);
                    $('#posts-container').prepend(newPost);
                    // add event listener to the delete link of the new post
                    deletePost($(' .delete-post',newPost));
                    // add event listener to comment form of the post
                    addComment($(' form',newPost));
                    // add event listener to comment div to delete/like comments
                    handleComment($(' .comment-div',newPost));
                    // add listener to like button of post
                    toggleLikeEvent($('>.toggle-like',newPost), data.post._id, 'Post');
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();

    // to display post in the DOM using AJAX
    function postDOM(post){
        return $(`<div class="post-div" id="post-${post._id}">
                    <a class="delete-post" href="/posts/destroy/${post._id}">delete</a>
                    <p> ${post.content} <br> <small> ${post.user.name}</small> </p>
                    <button class="toggle-like" id=${post._id}>like</button>
                    <strong><span class="like-count">0</span> likes</strong>
                    <form action="/comments/create" method="post">
                        <input type="text" name="content">
                        <input type="hidden" name="post" value=${post._id}>
                        <button type="submit">comment</button>
                    </form>
                
                    <div class="comment-div" id=${post._id}> 
                    </div>
                </div>`)
    }

    //to delete a post from the DOM
    function deletePost(postLink){
        $(postLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(postLink).prop('href'),
                success : function(data){
                    $(`#post-${data.post_id}`).remove();
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //to submit comment form via AJAX request
    function addComment(commentForm){
        $(commentForm).submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : $(commentForm).serialize(),
                success : function(data){
                    console.log(data.comment);
                    let newComment = commentDOM(data.comment);
                    // add comment on top of comment div
                    $('+.comment-div',commentForm).prepend(newComment);
                },
                error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    //to display comment in the DOM
    function commentDOM(comment){
        return (`<div id=${comment._id}>
                    <a class="delete-comment" href="/comments/destroy/${comment._id}">x</a>
                    <p> ${comment.content} <br> <small> ${comment.user.name} </small> </p> 
                    <button class="toggle-like" id=${comment._id}>like</button>
                    <strong><span class="like-count">0</span> likes</strong>
                </div>`)
    }

    //to delete/like comment from the DOM
    function handleComment(commentDiv){
        $(commentDiv).click(function(e){
            e.preventDefault();

            // if like button cliked
            if(e.target.type == 'submit'){
                toggleLike(e.target, e.target.id, 'Comment');
            }
            // if delete link clicked
            else if(e.target.href){
                let commentLink = e.target;
            
                $.ajax({
                    type : 'get',
                    url : $(commentLink).prop('href'),
                    success : function(data){
                        $(`#${data.comment_id}`).remove();
                    },
                    error : function(error){
                        console.log(error.responseText);
                    }
                })
            }
        })
    }

    // to add evet listener to like button of post/comment
    function toggleLikeEvent(button, id, type){
        $(button).click((e)=>{
            e.preventDefault();
            toggleLike(button, id, type);
        })
    }

    // to like or unlike a post/comment via AJAX post request
    function toggleLike(button, id, type){
        $.ajax({
            type : 'post',
            url : `likes/toggle/?id=${id}&type=${type}`,
            success : function(data){
                console.log(data);
                //update the like count
                updateLikeCount($('+strong .like-count',button), data.removedLike);
            },
            error : function(err){
                console.log(err);
            }
        })
    }

    //update like count in DOM
    function updateLikeCount(counter, change){
        let value = $(counter).html();
        if(change)$(counter).html(value-1);
        else $(counter).html(parseInt(value)+1);
    }

    //add deletion event listener to posts already present on the page
    let existingPosts = document.querySelectorAll('.delete-post');
    for(postLink of existingPosts){
        deletePost(postLink);
    }

    //add listener to all the existing comment div
    let existingCommentDivs = document.querySelectorAll('.comment-div');
    for(div of existingCommentDivs){
        handleComment(div);
    } 

    //add listeners to comment form of all existing posts
    let existingCommentForms = document.querySelectorAll('.post-div form');
    for(form of existingCommentForms){
        addComment(form);
    }

    //add listeners to like buttons of all existing posts
    let postLikeButtons = document.querySelectorAll('.post-div>.toggle-like');
    for(button of postLikeButtons){
        toggleLikeEvent(button, button.id, 'Post');
    }
}