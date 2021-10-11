{
   
        let commentForms=$('.new-comment-form');
        for(let i of commentForms){
        
                $(i).submit(function(e){
                    e.preventDefault();

                    $.ajax({
                        type:'post',
                        url:'/comment/create',
                        data:$(i).serialize(),
                        success:function(data){
                            
                        new Noty({
                            theme : 'relax' , 
                            text: "Comment Created",
                            type: 'success',
                            layout : "topRight",
                            timeout : 1500
                            
                            }).show();

                            let newComment=newCommentDom(data.data.comment);
                            $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                            deleteComment($(' .delete-comment-button', newComment));
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

    let newCommentDom=function(comment){
        return $(`<li id="comment-${comment._id}">
                <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>   
        
        
            ${comment.user.name}<br>
            ${comment.content}
        </li>`);
    }

    let deleteComment=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Deleted",
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

    let deletecommentbuttons=$('.delete-comment-button');
    for(let i of deletecommentbuttons)
    {
        $(i).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(i).prop('href'),
                success:function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme : 'relax' , 
                        text: "Comment Deleted",
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
