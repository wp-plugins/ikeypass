<?php
//define( 'DISALLOW_FILE_EDIT', true );
/**
 * @package iKeyPass
 * @version 1.0.1
 */
/*
Plugin Name: IkeyPass
Plugin URI: http://ikeypass.com/
Description: iKeyPass offers you an almost "break-proof", user defined, dynamic, unpredictable, authentication passcode for signing into your wordpress account. This is perhaps the safest user authentication system that safeguards your account from being ever hacked your identity from bring stolen! 
Author: Rahul Sharma
Version: 1.0.1
Author URI: http://ikeypass.com/
License: GPLv2 or later
*/

add_action('wp_ajax_ikeypass_session', 'iKeyPass_session');
add_action('wp_ajax_nopriv_ikeypass_session', 'iKeyPass_session');

add_action('wp_ajax_ikeypass_send_mail','iKeyPass_send_mail');
add_action('wp_ajax_nopriv_ikeypass_send_mail','iKeyPass_send_mail');

function iKeyPass_session()
{
	$_SESSION['ikeypass'] = sanitize_email($_POST['email_id']);
	echo "1";
}

function iKeyPass_send_mail()
{
    $to = sanitize_email($_POST["email_id"]);

    $subject = 'Welcome To iKeyPass!!';



    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-Mailer: PHP". phpversion() ."\r\n";


    $message = '<table width="236" border="1" cellspacing="1" cellpadding="1">
					  <tr>
						<td width="100">Email ID: </td>
						<td width="140">'.sanitize_email($_POST["email_id"]).'</td>
					  </tr>
					  <tr>
						<td>Phone Number: </td>
						<td>'.sanitize_text_field($_POST["mobile"]).'</td>
					  </tr>
					  <tr>
						<td>Selected Formula:</td>
						<td>'.((sanitize_text_field($_POST["ptype"])=="time")?"System Time":sanitize_text_field($_POST["ptype"])).'</td>
					  </tr>
					  <tr>
						<td>Selected Symbol:</td>
						<td>'.sanitize_text_field($_POST["pop_code"]).'</td>
					  </tr>
					  <tr>
						<td>Selected City:</td>
						<td>'.sanitize_text_field($_POST["pop_city"]).'</td>
					  </tr>
					  <tr>
						<td>Current Value:</td>
						<td>'.sanitize_text_field($_POST["value"]).'</td>
					  </tr>
					  <tr>
						<td>Selected Operator:</td>
						<td>'.sanitize_text_field($_POST["oprt"]).'</td>
					  </tr>
					  <tr>
						<td>Entered Value:</td>
						<td>'.sanitize_text_field($_POST["addvalue"]).'</td>
					  </tr>
					  <tr>
						<td>Final Passcode:</td>
						<td>'.sanitize_text_field($_POST["final_val"]).'</td>
					  </tr>
					  <tr>
						<td>Site URL:</td>
						<td>'.sanitize_text_field($_POST["site_url"]).'</td>
					  </tr>
					</table><br/>
					For further information regarding the plugin or to advertise in the iKeyPass banner or for technical support / feedback, please e-mail us at, info@ikeypass.com
					';


    if(mail($to, $subject, $message, $headers)){

        echo "True";

    } else{

        echo 'An unexpected error occurred';

    }
}


add_action( 'admin_enqueue_scripts', 'iKeyPass_EnqueuedAssets' );

function iKeyPass_EnqueuedAssets() {
	wp_enqueue_script( 'jquery.inputmask', plugin_dir_url( __FILE__ ) . 'login/js/jquery.inputmask.js', array( 'jquery' ), '1.0', true );
	wp_enqueue_script( 'jquery.maskedinput-ben', plugin_dir_url( __FILE__ ) . 'login/js/jquery.maskedinput-ben.js', array( 'jquery' ), '1.0', true );
	wp_enqueue_script( 'ikeypassscript', plugin_dir_url( __FILE__ ) . 'js/script.js', array( 'jquery' ), '1.0', false );
	
}


function iKeyPass_LoginPageScripts() {
	wp_enqueue_script("jquery");
	wp_enqueue_script( 'jquery.inputmask', plugin_dir_url( __FILE__ ) . 'login/js/vendor/modernizr.js', array( 'jquery' ), '1.0', false );
	wp_enqueue_script( 'jquery.inputmask', plugin_dir_url( __FILE__ ) . 'login/js/vendor/jquery.js', array( 'jquery' ), '1.0', false );
	wp_enqueue_script( 'jquery.inputmask', plugin_dir_url( __FILE__ ) . 'login/js/foundation.min.js', array( 'jquery' ), '1.0', false );
	
	wp_enqueue_script( 'jquery.inputmask', plugin_dir_url( __FILE__ ) . 'login/js/jquery.inputmask.js', array( 'jquery' ), '1.0', false );
	wp_enqueue_script( 'jquery.maskedinput-ben', plugin_dir_url( __FILE__ ) . 'login/js/jquery.maskedinput-ben.js', array( 'jquery' ), '1.0', false );
	wp_enqueue_script( 'ikeypassscript', plugin_dir_url( __FILE__ ) . 'login/js/script.js', array( 'jquery' ), '1.0', false );
	wp_enqueue_style('iKeyPassCSS', plugin_dir_url( __FILE__ ).'login/css/foundation.css');

	?>
    <style type="text/css">
        #login{
			display:none;
		}
    </style>
    <script>
      $(document).foundation();
    </script>
<?php }	

function iKeyPass_LoginInit(){
	if (isset ($_GET['action']) ){
		if(esc_attr($_GET['action']) == "logout"){
			return true;
		}
	}
	if(is_user_logged_in()){
		wp_deregister_style( 'login' );
		wp_deregister_style( 'dashicons' );
		add_action( 'login_enqueue_scripts', 'iKeyPass_LoginPageScripts');
		session_start();
		if($_SESSION['ikeypass'] == "" || $_SESSION['ikeypass'] == NULL){
			if(esc_attr(get_option('user_status') )=="true"){
				echo "<script>window.logout='".wp_logout_url()."';</script>";
				include "login/custom-login.php";
			}
		}else{
			wp_redirect('wp-admin');
		}
	}
}

add_action( 'login_init', 'iKeyPass_LoginInit');

function iKeyPass_AdminINIT(){
	if(is_plugin_active("ikeypass/ikeypass.php")){
		session_start();
		if($_SESSION['ikeypass'] == "" || $_SESSION['ikeypass'] == NULL){
			if(esc_attr(get_option('user_status') )=="true"){
				wp_redirect(wp_login_url());
			}
		}
	}
}

add_action('admin_init', 'iKeyPass_AdminINIT');

//Add Logout Node

/*function new_toolbar_item($wp_admin_bar)
{
    $wp_admin_bar->add_node(array("id"=>"iKeyPassLogoutLink", "title"=>"Logout From iKeyPass", "href"=>"#", "parent"=>"my-account"));  
}
add_action("admin_bar_menu", "new_toolbar_item", 999);*/


//Notice Hook
function iKeyPass_SecurityActivationStatus() {
	$class = "updated notice";
	$message = "You are registered with the special security of iKeyPass. <a href='http://ikeypass.com' target='_blank'>Know More about iKeyPass</a>";
        echo"<div class=\"$class\" style='width:97.5%; padding:1% 0 1% 2%;'> <p>$message</p></div>"; 
}
if(esc_attr(get_option('user_status')) == "true"){
	add_action( 'admin_notices', 'iKeyPass_SecurityActivationStatus' ); 
}

function logout_ikeypass(){
	session_start();
	$_SESSION['ikeypass']="";
	session_destroy();
}

add_action('wp_logout', 'logout_ikeypass');



add_action('admin_menu', 'iKeyPass_SettingAdminPageLink');

function iKeyPass_SettingAdminPageLink() {
	add_menu_page('iKeyPass Plugin Settings', 'iKeyPass Settings', 'administrator', 'ikeypass-plugin-settings', 'ikeypass_Admin_Plugin_settings_page', 'dashicons-admin-generic');
}

add_action('admin_init','iKeyPass_PluginSettingPageForm');



function iKeyPass_PluginSettingPageForm(){
	register_setting( 'ikeypass-secure-plugin-settings-group', 'emailid' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'mobile' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'formula_list' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'stock' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'temperature' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'value' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'operator' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'custome_value' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'final_passcode' );
	register_setting( 'ikeypass-secure-plugin-settings-group', 'user_status' );
}

function ikeypass_Admin_Plugin_settings_page() {
	?>
  <div class="wrap">
<h2>iKeyPass Registration </h2>
 
<form method="post" action="">
    <?php settings_fields( 'ikeypass-secure-plugin-settings-group' ); ?>
    <?php do_settings_sections( 'ikeypass-secure-plugin-settings-group' ); ?>
    
    <table class="form-table">
        <tr valign="top">
        <th scope="row">Email ID</th>
        <td id="email_id"><?php echo get_option('admin_email'); ?></td>
        <input type="hidden" name="site_url" id="site_url" value="<?php echo get_site_url(); ?>" />
        <input type="hidden" name="base" id="base" value="<?php echo plugin_dir_url( __FILE__ ); ?>" />
        </tr>
         
        <tr valign="top">
        <th scope="row">Phone Number</th>
        <td><input type="text" name="mobile" value="<?php echo esc_attr( get_option('mobile') ); ?>" id="mobile" autocomplete="off" maxlength="15" oncontextmenu="return false" /></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Select Formula</th>
        <td>
        	<select name="formula_list" id="ptype" style="width:20.3%;">
              <option value="null">Select Passcode Symbol</option>
              <option value="time" id="tm"></option>
              <option value="TEMP">Enter Temperature</option>
              <option value="STSM">Enter Stock Symbol</option>
            </select> <a href="javascript::" id="refresh_time">Refresh Time</a>
        </td>
        </tr>
        
        <tr valign="top" id="stock_symbol" style="display:none;">
        <th scope="row">Enter Stock Symbol</th>
        <td><input type="text" name="stock" id="symbol" value="<?php echo esc_attr( get_option('stock') ); ?>" autocomplete="off" /><a href="javascript:void(0);" style="color:#06F; text-decoration:none; font-family:arial; font-size:14px;" id="select">Get Value</a></td>
        </tr>
        
        <tr valign="top" style="display:none;" id="citys">
        <th scope="row">Enter City</th>
        <td><input type="text" name="temperature" id="pop_city" value="<?php echo esc_attr( get_option('temperature') ); ?>" autocomplete="off" placeholder="Enter city name with NO spaces" oncontextmenu="return false" /><a href="javascript:void(0);" style="color:#06F; text-decoration:none; font-family:arial; font-size:14px;" id="select_city">Get Value</a></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Value</th>
        <td><input type="text" name="value" id="value" value="<?php echo esc_attr( get_option('value') ); ?>" readonly /><img src="<?php echo plugin_dir_url( __FILE__ ).'/images/loader.gif'; ?>" id="loader" style="display:none;" /><label id="message"></label></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Select Operator</th>
        <td>
        	<select name="operator" id="oprt" style="width:20.3%;">
              <option value="null">Select Sign</option>
              <option value="plus">+ Plus</option>
              <option value="minus">- Minus</option>
              <option value="multiply">* Multiply</option>
              <option value="divide">÷ Divide</option>
            </select>
        </td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Enter Your Value</th>
        <td><input type="text" name="custome_value" value="<?php echo esc_attr( get_option('custome_value') ); ?>" id="addvalue" autocomplete="off" /></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Final Passcode</th>
        <td><input type="text" name="final_passcode" value="<?php echo esc_attr( get_option('final_passcode') ); ?>" readonly id="final_val" /></td>
        </tr>
        
    </table>
    
    <input type="submit" name="submit" id="register" class="button register" value="Register Now" style="float:left;">
  	<div style="float:left;">
    	<img src="<?php echo plugin_dir_url( __FILE__ ).'/images/728.gif'; ?>" id="loader_reg" style="width:25%; display:none; margin-left:10%;"  />
    </div>
</form>
</div>
<script type="text/javascript">

        document.onkeydown = function (event)
        {
             event = (event || window.event);
             if (event.keyCode == 123 || event.keyCode == 18)
             {
                   return false;
             }
        }
        </script>
<?php
}

?>