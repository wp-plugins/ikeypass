jQuery(document).ready(function() {
    jQuery("#security").click(function() {
        1 == jQuery("#security").prop("checked") ? (jQuery("#simple").slideUp(300), jQuery("#advance").slideDown(100)) : (jQuery("#advance").slideUp(300), jQuery("#simple").slideDown(100))
    });
    var e = new Date,
        a = e.getMinutes();
    if (1 == a.toString().length) var l = "0" + e.getMinutes();
    else var l = e.getMinutes();
    var r = e.getHours() + ":" + l;
    jQuery("#tm").text("System Time " + r), jQuery("#addvalue").blur(function() {
        if ("time" == jQuery("#ptype").val()) {
            window.newMM = "", window.newHR = "";
            var e = jQuery(this).val().split(":"); - 1 != e[0].indexOf("_") ? (e[0] = e[0].replace("_", ""), newHR = -1 != e[0].indexOf("_") || 1 == e[0].indexOf("_") ? "00" : "0" + e[0]) : newHR = e[0] > 23 ? "00" : e[0], -1 != e[1].indexOf("_") ? (e[1] = e[1].replace("_", ""), newMM = -1 != e[1].indexOf("_") || 1 == e[1].indexOf("_") ? "00" : "0" + e[1]) : newMM = e[1], jQuery("#addvalue").val(newHR + ":" + newMM), jQuery("#addvalue").trigger("keyup")
        }
    }), jQuery("#ptype").change(function() {
        jQuery("#message").html(""), jQuery("#value").val(""), jQuery("#addvalue").val(""), jQuery("#final_val").val("");
        var e = jQuery("#ptype").val();
        if ("null" == e && (jQuery("#stock_symbol").slideUp(300), jQuery("#citys").slideUp(300)), "time" == e) {
            jQuery("#stock_symbol").slideUp(300);
            var a = new Date,
                l = a.getMinutes();
            if (1 == l.toString().length) var r = "0" + a.getMinutes();
            else var r = a.getMinutes();
            jQuery("#value").val(a.getHours() + ":" + r), jQuery("#oprt option").each(function(e) {
                (5 == e || 4 == e || 3 == e) && jQuery(this).remove()
            }), jQuery("#addvalue").mask("99:99", {
                validate: function(e, a) {
                    var l = parseInt(e[0]),
                        r = parseInt(e[1]),
                        u = !0;
                    return l >= 0 && 24 > l || 0 != a || (e[0] = "23", u = !1), r >= 0 && 60 > r || 1 != a || (e[1] = "00", u = !1), u
                }
            }), jQuery("#citys").slideUp(300)
        }
        "STSM" == e && (jQuery("#pop_city").val(""), 0 != jQuery("#oprt").length && 5 != jQuery("#oprt")[0].options.length && jQuery("#oprt").append('<option value="multiply">* Multiply</option><option value="divide">&divide; Divide</option>'), 0 != jQuery("#oprt").length && jQuery("#addvalue").unmask(), jQuery("#stock_symbol").slideDown(300), jQuery("#symbol").focus(), jQuery("#citys").slideUp(300)), "TEMP" == e && (jQuery("#symbol").val(""), 0 != jQuery("#oprt").length && 5 != jQuery("#oprt")[0].options.length && jQuery("#oprt").append('<option value="multiply">* Multiply</option><option value="divide">&divide; Divide</option>'), 0 != jQuery("#oprt").length && jQuery("#addvalue").unmask(), jQuery("#citys").slideDown(300), jQuery("#stock_symbol").slideUp(300), jQuery("#symbol").focus())
    }), jQuery("#cancel").click(function(e) {
        jQuery(".popup").slideUp(300), jQuery("#background").css("display", "none"), e.preventDefault()
    }), jQuery("#select").click(function(e) {
        e.preventDefault(), jQuery("#message").html(""), "" == jQuery("#symbol").val() ? jQuery("#message").html("Please Enter Code") : (jQuery("#loader").css("display", "block"), jQuery(".backgr").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "fn_name=" + jQuery("#symbol").val(),
            url: "http://ikeypass.com/wordpress_api/ajax.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            success: function(e) {
                "0.00" == e.value ? (jQuery("#message").html("Unable to Load Value"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none")) : (jQuery("#message").html(""), jQuery("#value").val(e.value), jQuery(".popup").slideUp(300), jQuery("#background").css("display", "none"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none"), jQuery("#addvalue").focus())
            },
            error: function() {
                jQuery("#message").html("Unable to Load Value"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none")
            }
        })), e.preventDefault()
    }), jQuery("#select_city").click(function(e) {
        e.preventDefault(), "" == jQuery("#pop_city").val() ? jQuery("#message").html("Please Enter Code") : (jQuery("#loader").css("display", "block"), jQuery(".backgr").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "fn_name=TEMP&city=" + jQuery("#pop_city").val(),
            url: "http://ikeypass.com/wordpress_api/ajax.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            timeout: 2e4,
            success: function(e) {
                "0.00" == e.value ? (jQuery("#message").html("Unable to Load Value"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none")) : (jQuery("#message").html(""), jQuery("#value").val(e.value), jQuery(".popup").slideUp(300), jQuery("#background").css("display", "none"), jQuery("#loader").css("display", "none"), jQuery(".backgr").css("display", "none"), jQuery("#addvalue").focus())
            },
            error: function() {
                jQuery("#loader").css("display", "none"), alert("Unable to connect with server!!")
            }
        })), e.preventDefault()
    }), jQuery("#symbol").keyup(function() {
        jQuery("#symbol").val(jQuery("#symbol").val().toUpperCase())
    }), jQuery("#oprt").change(function() {
        jQuery("#addvalue").val(""), jQuery("#final_val").val("");
        var e = (parseFloat(jQuery("#value").val()), parseFloat(jQuery("#addvalue").val()), parseFloat(jQuery("#oprt").val()));
        "plus" == e && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8)), "minus" == e && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8)), "multiply" == e && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 2)), "percentage" == e && (jQuery("#addvalue").attr("disabled", !1), jQuery("#addvalue").attr("maxlength", 8)), "no" == e && (jQuery("#addvalue").attr("disabled", "disabled"), jQuery("#final_val").val(jQuery("#value").val()), jQuery("#final_val").attr("readonly", "readonly")), "" == jQuery("#addvalue").val() && jQuery("#addvalue").attr("maxlength", 8)
    }), jQuery("#addvalue").keyup(function() {
        var e = jQuery("#oprt").val(),
            a = parseFloat(jQuery("#value").val()),
            l = parseFloat(jQuery("#addvalue").val()),
            r = 0,
            u = 0,
            t = 0,
            y = 0,
            n = 0,
            i = 0,
            s = 0,
            o = 0,
            p = 0,
            d = 0;
        "plus" == e && ("time" == jQuery("#ptype").val() ? (n = jQuery("#addvalue").val().split(":"), r = parseInt(n[0]), u = parseInt(n[1]), i = jQuery("#value").val().split(":"), t = parseInt(i[0]), y = parseInt(i[1]), t + r > 23 ? (s = t + r, o = s - 24, p = 0 + o) : p = t + r, y + u > 59 ? (total_mm = y + u, total_mm >= 60 && (p += 1, p > 23 && (o = p - 24, p = 0 + o), o = total_mm - 60, d = 0 + o)) : d = y + u, 10 > p && (p = "0" + p), 10 > d && (d = "0" + d), isNaN(p) && (p = "00"), isNaN(d) && (d = "00"), jQuery("#final_val").val(p + ":" + d)) : jQuery("#final_val").val("TEMP" == jQuery("#ptype").val() ? a + l : (a + l).toFixed(2))), "minus" == e && ("time" == jQuery("#ptype").val() ? (n = jQuery("#addvalue").val().split(":"), r = parseInt(n[0]), u = parseInt(n[1]), i = jQuery("#value").val().split(":"), t = parseInt(i[0]), y = parseInt(i[1]), 0 > t - r ? (s = t - r, o = s + 24, p = o) : p = t - r, 0 > y - u ? (total_mm = y - u, total_mm += 60, carry_hh = 1, p -= carry_hh, 0 > p && (p += 24), d = Math.abs(total_mm)) : d = y - u, 10 > p && (p = "0" + p), 10 > d && (d = "0" + d), isNaN(p) && (p = "00"), isNaN(d) && (d = "00"), jQuery("#final_val").val(p + ":" + d)) : "TEMP" == jQuery("#ptype").val() ? jQuery("#final_val").val(a - l) : 0 > a - l ? (jQuery("#addvalue").val(jQuery("#value").val()), jQuery("#final_val").val(jQuery("#value").val().toFixed(2) - 1)) : jQuery("#final_val").val((a - l).toFixed(2))), "multiply" == e && jQuery("#final_val").val("TEMP" == jQuery("#ptype").val() ? a * l : (a * l).toFixed(2)), "divide" == e && jQuery("#final_val").val("TEMP" == jQuery("#ptype").val() ? (a / l).toFixed(0) : (a / l).toFixed(2)), "" == jQuery("#addvalue").val() && jQuery("#final_val").val(a)
    }), jQuery("#addvalue").keypress(function(e) {
        var a = e.which ? e.which : event.keyCode;
        if (46 != a && a > 31 && (48 > a || a > 57)) return !1;
        var l = new Array;
        return l = jQuery(this).val().split("."), l.length - 1 == 1 && 46 == e.charCode ? !1 : void 0
    }), jQuery("#mobile").keypress(function(e) {
        var a = e.which ? e.which : event.keyCode;
        return a > 31 && (48 > a || a > 57) ? !1 : void 0
    }), jQuery("#mobile").blur(function() {
        jQuery(this).attr("readonly", "readonly")
    }), jQuery("#mobile").attr("readonly", !0), jQuery("#mobile").click(function() {
        jQuery(this).attr("readonly", !1)
    }), jQuery("#pop_city").keydown(function(e) {
        return 32 == e.keyCode && (alert("Enter city name with NO spaces"), jQuery(this).val(jQuery(this).val().toString().trim())), e.keyCode > 64 && e.keyCode < 91 || e.keyCode > 96 && e.keyCode < 123 || 8 == e.keyCode ? !0 : !1
    }), jQuery("#symbol").keydown(function(e) {
        return 32 == e.keyCode && jQuery(this).val(jQuery(this).val().toString().trim()), e.keyCode > 64 && e.keyCode < 91 || e.keyCode > 96 && e.keyCode < 123 || 8 == e.keyCode ? !0 : !1
    }), jQuery("#pop_city").bind("cut copy paste", function(e) {
        e.preventDefault()
    }), jQuery("#symbol").bind("cut copy paste", function(e) {
        e.preventDefault()
    }), jQuery("#refresh_time").click(function() {
        var e = new Date,
            a = e.getMinutes();
        if (1 == a.toString().length) var l = "0" + e.getMinutes();
        else var l = e.getMinutes();
        var r = e.getHours() + ":" + l;
        jQuery("#tm").text("System Time " + r), "time" == jQuery("#ptype").val() && jQuery("#value").val(r)
    }), jQuery("#register").click(function(e) {
        return "" == jQuery("#mobile").val() ? (alert("Please fill mobile number"), !1) : "" == jQuery("#ptype").val() ? (alert("Please select passcode type"), !1) : "" == jQuery("#value").val() ? (alert("Value should not null"), !1) : "" == jQuery("#oprt").val() ? (alert("Please select the operator"), !1) : "" == jQuery("#addvalue").val() ? (alert("Please add your value"), !1) : "" == jQuery("#final_val").val() ? (alert("Final value should not null"), !1) : (jQuery("#loader_reg").css("display", "block"), jQuery.ajax({
            crossDomain: !0,
            data: "email_id=" + jQuery("#email_id").html() + "&mobile=" + jQuery("#mobile").val() + "&ptype=" + jQuery("#ptype").val() + "&pop_code=" + jQuery("#symbol").val() + "&pop_city=" + jQuery("#pop_city").val() + "&value=" + jQuery("#value").val() + "&oprt=" + jQuery("#oprt").val() + "&addvalue=" + jQuery("#addvalue").val() + "&final_val=" + jQuery("#final_val").val() + "&site_url=" + jQuery("#site_url").val() + "&function=register",
            url: "http://ikeypass.com/wordpress_api/Register_API.php",
            dataType: "jsonp",
            jsonp: "jsonp_callback",
            success: function() {
                jQuery.ajax({
                    type: "POST",
                    url: "options.php",
                    data: "user_status=true&option_page=" + jQuery("input[name=option_page]").val() + "&action=" + jQuery("input[name=action]").val() + "&_wpnonce=" + jQuery("input[name=_wpnonce]").val() + "&_wp_http_referer=" + jQuery("input[name=_wp_http_referer]").val(),
                    success: function() {
                        jQuery("#loader_reg").css("display", "none"), jQuery.ajax({
                            type: "POST",
                            url: "/wp-admin/admin-ajax.php",
                            data: "action=ikeypass_send_mail&email_id=" + jQuery("#email_id").html() + "&mobile=" + jQuery("#mobile").val() + "&ptype=" + jQuery("#ptype").val() + "&pop_code=" + jQuery("#symbol").val() + "&pop_city=" + jQuery("#pop_city").val() + "&value=" + jQuery("#value").val() + "&oprt=" + jQuery("#oprt").val() + "&addvalue=" + jQuery("#addvalue").val() + "&final_val=" + jQuery("#final_val").val() + "&site_url=" + jQuery("#site_url").val() + "&function=register",
                            success: function(e) {
                                alert("You have successfully registered with ikeyPass.");
                            }
                        })
                    }
                })
            },
            error: function(e) {
                alert("Unable to connect server!! Error: " + e)
            }
        }), void e.preventDefault())
    }), jQuery("#addvalue").on("mouseup", function() {
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
    })
});