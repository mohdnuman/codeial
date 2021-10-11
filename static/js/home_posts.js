{
    let createPost=function(){
        let newPostForm=$("#new-post-form");
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                      
                   new Noty({
                    theme : 'relax' , 
                    text: "Post Created",
                    type: 'success',
                    layout : "topRight",
                    timeout : 1500
                    
                    }).show();

                    let newPost=newPostDom(data.data.post);
                    $("#posts-container>ul").prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },error:function(error){
                    console.log(error.responseText); 
                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'error',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                }
            });
        });
   
    }


    let newPostDom=function(post){
        return $(`<li id="post-${post._id}"> 
            <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
    
        ${post.user.name}<br>
        ${post.content}
    
        
            <form action="/comment/create"  class="new-comment-form" method="POST">
                <input type="text" name="content" placeholder="type something to add comment...">
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add Comment">
            </form>

            <div class="post-comments-list">
                    <ul id="post-comments-${post._id }">
                                
                    </ul>
            </div>
    
    </li>
    
    `);
    }

    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Post Deleted with the associated comments",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();

                },error:function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'error',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                }
            });
        });
  
    }
   

    createPost();
     

    //to delete the posts already present on the feed 
    let deletebuttons=$('.delete-post-button');
    for(let i of deletebuttons)
    {
        $(i).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(i).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Post Deleted with the associated comments",
                        type: 'success',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();

                },error:function(error){
                    console.log(error.responseText);
                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'error',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                }
            });
        });
  
    }


}
