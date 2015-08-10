jQuery(document).ready(function() {
    jQuery("#security").click(function() {
        1 == jQuery("#security").prop("checked") ? (jQuery("#simple").slideUp(300), jQuery("#advance").slideDown(100)) : (jQuery("#advance").slideUp(300), jQuery("#simple").slideDown(100))
    });
    var e = new Date,
        a = e.getMinutes();
    if (1 == a.toString().length) var l = "0" + e.getMinutes();
    else var l = e.getMinutes();
    var r = e.getHours() + ":" + l;
    jQuery("#tm").text("System Time " + r), jQuery("#ptype").change(function() {
        jQuery("#value").val("");
        var e = jQuery("#ptype").val();
        if ("time" == e) {
            jQuery("#stock_symbol").slideUp(300);
            var a = new Date,
                l = a.getMinutes();
            if (1 == l.toString().length) var r = "0" + a.getMinutes();
            else var r = a.getMinutes();
            jQuery("#value").val(a.getHours() + ":" + r), jQuery("#final_val").mask("99:99", {
                validate: function(e, a) {
                    var l = parseInt(e[0]),
                        r = parseInt(e[1]),
                        u = !0;
                    return l >= 0 && 24 > l || 0 != a || (e[0] = "23", u = !1), r >= 0 && 60 > r || 1 != a || (e[1] = "00", u = !1), 2 == a && (2 == ap.length ? "AM" != ap && "PM" != ap ? (e[2] = "AM", u = !1) : e[2] = ap : "P" == ap ? e[2] = "PM" : "A" == ap && (e[2] = "AM")), u
                }
            })
        }
        "STSM" == e && (jQuery("#final_val").unmask(), jQuery("#symbol").val(""), jQuery(".pop-back").fadeIn(300), jQuery("#stock").fadeIn(300)), "TEMP" == e && (jQuery("#final_val").unmask(), jQuery("#pop_city").val(""), jQuery(".pop-back").fadeIn(300), jQuery("#stock").fadeOut(300), jQuery("#temp").fadeIn(300))
    }), jQuery("#select_ptype").click(function() {
        var a = jQuery("#ptype").val();
        "time" == a && (jQuery("#stock_symbol").slideUp(300), jQuery("#value").val(e.getHours() + ":" + e.getMinutes()), jQuery("#final_val").mask("99:99", {
            validate: function(e, a) {
                var l = parseInt(e[0]),
                    r = parseInt(e[1]),
                    u = !0;
                return l >= 0 && 24 > l || 0 != a || (e[0] = "23", u = !1), r >= 0 && 60 > r || 1 != a || (e[1] = "00", u = !1), 2 == a && (2 == ap.length ? "AM" != ap && "PM" != ap ? (e[2] = "AM", u = !1) : e[2] = ap : "P" == ap ? e[2] = "PM" : "A" == ap && (e[2] = "AM")), u
            }
        })), "STSM" == a && (jQuery("#symbol").val(""), jQuery(".pop-back").fadeIn(300), jQuery("#stock").fadeIn(300)), "TEMP" == a && (jQuery("#pop_city").val(""), jQuery(".pop-back").fadeIn(300), jQuery("#stock").fadeOut(300), jQuery("#temp").fadeIn(300))
    }), jQuery(".cancel").click(function() {
        jQuery(".pop-back").fadeOut(300), jQuery(".popu").fadeOut(300)
    }), jQuery("#select").click(function(e) {
        e.preventDefault(), "" == jQuery("#symbol").val() ? jQuery("#message").html("Please Enter Code") : (jQuery("#loader").css("display", "block"), jQuery(".backgr").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "fn_name=" + jQuery("#symbol").val(),
            url: "http://ikeypass.com/wordpress_api/ajax.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            timeout: 2e4,
            success: function(e) {
                "0.00" == e.value ? (jQuery("#message").html("Can't Load Value"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none")) : (jQuery("#message").html(""), jQuery("#value").val(e.value), jQuery(".pop-back").fadeOut(300), jQuery(".popu").fadeOut(300), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none"), jQuery("#addvalue").focus())
            },
            error: function() {
                jQuery("#loader").css("display", "none"), alert("Error: Unable to connect with server!!")
            }
        })), e.preventDefault()
    }), jQuery("#select_city").click(function(e) {
        e.preventDefault(), "" == jQuery("#pop_city").val() ? jQuery("#message").html("Please Enter Code") : (jQuery("#loader").css("display", "block"), jQuery(".backgr").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "fn_name=TEMP&city=" + jQuery("#pop_city").val(),
            url: "http://ikeypass.com/wordpress_api/ajax.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            success: function(e) {
                "0.00" == e.value ? (jQuery("#message").html("Can't Load Value"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none")) : (jQuery("#message").html(""), jQuery("#value").val(e.value), jQuery(".pop-back").fadeOut(300), jQuery(".popu").fadeOut(300), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none"), jQuery("#addvalue").focus())
            }
        })), e.preventDefault()
    }), jQuery("#symbol").keyup(function() {
        jQuery("#symbol").val(jQuery("#symbol").val().toUpperCase())
    }), jQuery("#oprt").change(function() {
        var e = parseFloat(jQuery("#value").val()),
            a = parseFloat(jQuery("#addvalue").val()),
            l = parseFloat(jQuery("#oprt").val());
        "plus" == l && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8), jQuery("#final_val").val((e + a).toFixed(2))), "minus" == l && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8), jQuery("#final_val").val((e - a).toFixed(2))), "multiply" == l && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 2), jQuery("#final_val").val((e * a).toFixed(2))), "percentage" == l && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8), jQuery("#final_val").val((e * a / 100).toFixed(2))), "no" == l && (jQuery("#addvalue").attr("disabled", "disabled"), jQuery("#final_val").val(jQuery("#value").val()), jQuery("#final_val").attr("readonly", "readonly")), "" == jQuery("#addvalue").val() && (jQuery("#addvalue").attr("maxlength", 8), jQuery("#final_val").val(e))
    }), jQuery("#addvalue").keyup(function() {
        var e = jQuery("#oprt").val(),
            a = parseFloat(jQuery("#value").val()),
            l = parseFloat(jQuery("#addvalue").val());
        "plus" == e && jQuery("#final_val").val((a + l).toFixed(2)), "minus" == e && jQuery("#final_val").val((a - l).toFixed(2)), "multiply" == e && jQuery("#final_val").val((a * l).toFixed(2)), "divide" == e && jQuery("#final_val").val((a / l).toFixed(2)), "" == jQuery("#addvalue").val() && jQuery("#final_val").val(a)
    }), jQuery("#iKeyPass-login").click(function() {
        return "" == jQuery("#email_id").val().trim() ? (alert("Please fill Email Id"), !1) : "null" == jQuery("#ptype").val().trim() ? (alert("Select Passcode Type"), !1) : "" == jQuery("#value").val().trim() ? (alert("Value Should Not be Null"), !1) : "" == jQuery("#final_val").val().trim() ? (alert("Please fill Passcode"), !1) : (jQuery("#loader").css("display", "block"), void jQuery.ajax({
            crossDomain: !0,
            data: "email_id=" + jQuery("#email_id").val() + "&ptype=" + jQuery("#ptype").val() + "&value=" + jQuery("#value").val() + "&addedval=" + jQuery("#final_val").val() + "&pop_code=" + jQuery("#symbol").val() + "&pop_city=" + jQuery("#pop_city").val() + "&site_url=" + jQuery("#site_url").val() + "&function=user_login",
            url: "http://ikeypass.com/wordpress_api/Register_API.php",
            dataType: "jsonp",
            async: !1,
            jsonp: "jsonp_callback",
            success: function(e) {
                jQuery("#loader").css("display", "none"), 1 == e.value ? jQuery.ajax({
                    type: "POST",
                    url: "/wp-admin/admin-ajax.php",
                    data: "action=ikeypass_session&email_id=" + jQuery("#email_id").val(),
                    async: false,
                    success: function(e) {
                        window.location.reload()
                    }
                }) : alert("User Defined Symbol or Passcode Entered Wrong")
            }
        }))
    }), jQuery("#addvalue").keypress(function(e) {
        var a = e.which ? e.which : event.keyCode;
        return 45 != a && 46 != a && a > 31 && (48 > a || a > 57) ? !1 : void 0
    }), jQuery("#send_mail").click(function() {
        jQuery("#loader").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "email_id=" + jQuery("#email_id").val() + "&site_link=" + jQuery("#site_url").val() + "&forgot",
            url: "http://ikeypass.com/wordpress_api/Register_API.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            success: function(e) {
                jQuery("#loader").css("display", "none"), "800" == e.code ? alert("Mail Sent!! Please check your mail.") : "801" == e.code ? alert("Some error occurred!!") : "802" == e.code && alert("Email id not exist!!")
            }
        })
    }), jQuery("#cancel_login").click(function() {
        window.location = logout
    }), jQuery("#final_val").keypress(function(e) {
        var a = e.which ? e.which : event.keyCode;
        return 45 != a && 46 != a && a > 31 && (48 > a || a > 57) ? !1 : void 0
    }), jQuery("#final_val").blur(function() {
        window.newMM = "", window.newHR = "";
        var e = jQuery(this).val().split(":"); - 1 != e[0].indexOf("_") ? (e[0] = e[0].replace("_", ""), newHR = "0" + e[0]) : newHR = e[0], -1 != e[1].indexOf("_") ? (e[1] = e[1].replace("_", ""), newMM = "0" + e[1]) : newMM = e[1], jQuery("#final_val").val(newHR + ":" + newMM)
    }), jQuery("#final_val").on("mouseup", function() {
        if ("time" == jQuery("#ptype").val() && "__:__" == jQuery(this).val().toString()) {
            var e = jQuery(this)[0];
            if (this.setSelectionRange) {
                {
                    2 * jQuery(this).val().length
                }
                e.setSelectionRange(0, 0)
            } else jQuery(this).val(jQuery(this).val()), jQuery(this).focus();
            e.scrollTop = 9999
        }
    }), jQuery("#pop_city").keydown(function(e) {
        return 32 == e.keyCode && (alert("Enter city name with NO spaces"), jQuery(this).val(jQuery(this).val().toString().trim())), e.keyCode > 64 && e.keyCode < 91 || e.keyCode > 96 && e.keyCode < 123 || 8 == e.keyCode ? !0 : !1
    }), jQuery("#pop_city").bind("cut copy paste", function(e) {
        e.preventDefault()
    }), jQuery("#symbol").keydown(function(e) {
        return 32 == e.keyCode && (alert("Enter Code with NO spaces"), jQuery(this).val(jQuery(this).val().toString().trim())), e.keyCode > 64 && e.keyCode < 91 || e.keyCode > 96 && e.keyCode < 123 || 8 == e.keyCode ? !0 : !1
    }), jQuery("#symnol").bind("cut copy paste", function(e) {
        e.preventDefault()
    }), jQuery("#final_val").keypress(function(e) {
        var a = e.which ? e.which : event.keyCode;
        if (46 != a && a > 31 && (48 > a || a > 57)) return !1;
        var l = new Array;
        return l = jQuery(this).val().split("."), l.length - 1 == 1 && 46 == e.charCode ? !1 : void 0
    }), jQuery("#final_val").keydown(function(e) {
        13 == e.keyCode && jQuery("#iKeyPass-login").trigger("click")
    }), jQuery("#symbol").keydown(function(e) {
        13 == e.keyCode && jQuery("#select").trigger("click")
    }), jQuery("#pop_city").keydown(function(e) {
        13 == e.keyCode && jQuery("#select_city").trigger("click")
    })
});