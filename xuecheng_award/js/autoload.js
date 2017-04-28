//mask layer isclose:true false, postion:show_middle show_top show_bottom
function modalstyle(isclose,position, header, footer){
    //var strhtml = ("<div class=\"modalcover\"><div class=\"modal fade in\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" backdrop=\"static\" data-backdrop=\"static\">");
    var strhtml = ("<div class=\"modal fade in\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" backdrop=\"true\" data-backdrop=\"static\"> ");
    strhtml += ("   <div class=\"modal-dialog "+position+" \">");
    //$("body").append("   <div class=\"modal-dialog \">");
    strhtml += ("      <div class=\"modal-content\" style=\"height:100%\">");
    if(header){
        strhtml +=("         <div class=\"modal-header\">");
        if(isclose){
            strhtml +=("            <button type=\"button\" class=\"close\" style=\"font-size:40px;width:80px;height:60px;line-height:60px;\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>");
        }
        strhtml +=("            <h5 class=\"modal-title\" id=\"myModalLabel\"></h5>");
        strhtml +=("         </div>");
    }
    strhtml +=("              <div class=\"modal-body\"></div>");
    if(footer){
        strhtml +=("         <div class=\"modal-footer\"></div>");
    }
    strhtml +=("      </div><!-- /.modal-content -->");
    strhtml +=("  </div>");
    strhtml +=("</div>");
    //strhtml +=("</div>");
    $("body").append(strhtml);
}

(function($){

    //mask layer ajax load
    $.fn.modalajax = function(settings){
        settings = $.extend({
            action:"load",// ajax action type load:post and ajax load page  sure:confirm operation error: error message show
            type:"post",
            maskremove:true,//delete cover index
            modal:true,//show modal
            position:"middle",//page on layer position value : top middle bottom
            async:true ,//asynchronous or synchronization load
            loadurl : null ,
            checklogin:false, //before operation to check login
            header:true,
            footer:true,
            isclose:true,
            loadheader:null,
            loadfooter:null,
            loadbody:null,
            loaddata:null,
            beforeSenddiv:true,
            loadsuccess:function(data){
                $(".modal-body").html(data);
            },
            beforeSend:function(){
                if(settings.beforeSenddiv){
                    $(".modal-body").html('<div style=\"width:100%;text-align:center;\"><img src="/style/images/statusimges/loading.gif" border="0"/></div>');
                }else{
                    $(".modalcenter").html('<img src="/style/images/statusimges/loading.gif" style="position: absolute;left: 40%;" border="0" class="img_info"/>');
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $(".modal-body").html('<div style=\"width:100%;text-align:center;\"><img src="/style/images/statusimges/error.png" border="0"/>'+errorThrown+'</div>');
                $(".modal-footer").html('<div style=\"width:100%;text-align:center;\"><button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" aria-hidden=\"true\">关闭</button>');
            },
            sureheader:"您确定要执行此操作？",
            surebody:'<div style=\"width:100%;text-align:center;\"><button type=\"button\" class=\"btn btn-danger  sureclick\">确&nbsp;认</button> <button type=\"button\" class=\"btn btn-primary ml50\" data-dismiss=\"modal\" aria-hidden=\"true\">取&nbsp;消</button></div>',
            surefooter:""
        },settings);
        var showModal = function(){
            if(settings.maskremove){
                $("#myModal").modal('hide');
                $("#myModal").remove();
                $(".modal-backdrop").remove();
            }
            modalstyle(settings.isclose,"show_"+settings.position, settings.header, settings.footer);
            //$("#myModal").modal({backdrop:false});
            $("#myModal").modal('show');

            if(settings.action=="load" || settings.action=="post" || settings.action=="error"){
                settings.loadheader!=null ? $(".modal-title").html(settings.loadheader) :null;
                settings.loadfooter!=null ? $(".modal-footer").html(settings.loadfooter) :null;
                settings.loadbody!=null ? $(".modal-body").html(settings.loadbody) :null;
            }else if(settings.action=="sure"){
                settings.sureheader!=null ? $(".modal-title").html(settings.sureheader) :null;
                settings.surefooter!=null ? $(".modal-footer").html(settings.surefooter) :null;
                settings.surebody!=null ? $(".modal-body").html(settings.surebody) :null;
            }

        };
        var loadModal = function(){
            $.ajax({
                url : settings.loadurl,
                async: settings.async,
                data : settings.loaddata ,
                beforeSend : settings.beforeSend,
                type : settings.type,
                success : settings.loadsuccess,
                error : settings.error
            });
        };
        var sureModal = function(){
            //绑定确认事件
            $(".sureclick").bind('click',function(){
                loadModal();
            });
        };
        var errorModal = function(){};
        if(settings.modal){showModal();}
        if(settings.action=="load"){loadModal();}
        if(settings.action=="sure"){sureModal();}
        if(settings.action=="error"){errorModal();}
    };
    //send sms message
    /*$.fn.smsajaxsend =function(settings){

    }*/
})(jQuery);

