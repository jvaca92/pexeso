/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 var boxopened = "";
        var imgopened = "";
        var count = 0;
        var found =  0;

        function randomFromTo(from, to){
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        function shuffle() {
            var children = $("#boxcard").children();
            var child = $("#boxcard div:first-child");

            var array_img = new Array();

            for (i=0; i<children.length; i++) {
                array_img[i] = $("#"+child.attr("id")+" img").attr("src");
                child = child.next();
            }

            var child = $("#boxcard div:first-child");

            for (z=0; z<children.length; z++) {
                randIndex = randomFromTo(0, array_img.length - 1);

                // set new image
                $("#"+child.attr("id")+" img").attr("src", array_img[randIndex]);
                array_img.splice(randIndex, 1);

                child = child.next();
            }
        }

        function resetGame() {
            shuffle();
            $("img").hide();
            $("img").removeClass("opacity");
            count = 0;
            $("#msg").remove();
            $("#count").html("" + count);
            boxopened = "";
            imgopened = "";
            found = 0;
            return false;
        }

        $(document).ready(function() {
            $("img").hide();
            $("#boxcard div").click(openCard);

            shuffle();

            function openCard() {

                id = $(this).attr("id");

                if ($("#"+id+" img").is(":hidden")) {
                    $("#boxcard div").unbind("click", openCard);

                    $("#"+id+" img").slideDown('fast');

                    if (imgopened == "") {
                        boxopened = id;
                        imgopened = $("#"+id+" img").attr("src");
                        setTimeout(function() {
                            $("#boxcard div").bind("click", openCard)
                        }, 300);
                    } else {
                        currentopened = $("#"+id+" img").attr("src");
                        if (imgopened != currentopened) {
                            // close again
                            setTimeout(function() {
                                $("#"+id+" img").slideUp('fast');
                                $("#"+boxopened+" img").slideUp('fast');
                                boxopened = "";
                                imgopened = "";
                            }, 400);
                        } else {
                            // found
                            $("#"+id+" img").addClass("opacity");
                            $("#"+boxopened+" img").addClass("opacity");
                           
                            //otevře danou prezentaci
               
                            var tecka = imgopened.indexOf(".");
                            var lomitko = imgopened.indexOf("/");
                            var result = imgopened.slice(lomitko + 1, tecka);
                            
                            
                            //alert(result);
                            window.open("ppt/ppt_" + result + ".doc");

                            
                            found++;
                            boxopened = "";
                            imgopened = "";
                        
                        }
                        
                        setTimeout(function() {
                            $("#boxcard div").bind("click", openCard)
                        }, 400);
                    }


                    count++;
                    $("#count").html("" + count);

                    if (found == 10) {
                        msg = '<span id="msg">Congrats ! You Found All Sushi With </span>';
                        $("span.link").prepend(msg);
                    }
                }
            }
        });
