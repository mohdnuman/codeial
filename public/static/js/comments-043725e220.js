{let e=$(".new-comment-form");for(let n of e)$(n).submit((function(e){e.preventDefault(),$.ajax({type:"post",url:"/comment/create",data:$(n).serialize(),success:function(e){new Noty({theme:"relax",text:"Comment Created",type:"success",layout:"topRight",timeout:1500}).show();let n=t(e.data.comment);$(`#post-comments-${e.data.comment.post}`).prepend(n),o($(" .delete-comment-button",n))},error:function(e){console.log(e.responseText),new Noty({theme:"relax",text:e.responseText,type:"error",layout:"topRight",timeout:1500}).show()}})}));let t=function(e){return $(`<li id="comment-${e._id}">\n                <a class="delete-comment-button" href="/comment/destroy/${e._id}">X</a>   \n        \n        \n            ${e.user.name}<br>\n            ${e.content}<br>\n\n            <form action="/like/toggle/?type=Comment&id=${e._id}" class="like-form" method="POST"  data-likes="${e.likes.length}">\n            <input type="hidden" name="comment" value="${e._id}">\n            <button type="submit"><i class="far fa-thumbs-up"></i><span>${e.likes.length}</span>  Like</button>\n        </form>\n        </li>`)},o=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText),new Noty({theme:"relax",text:e.responseText,type:"error",layout:"topRight",timeout:1500}).show()}})}))},n=$(".delete-comment-button");for(let e of n)$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText),new Noty({theme:"relax",text:e.responseText,type:"error",layout:"topRight",timeout:1500}).show()}})}))}