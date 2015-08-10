<script type="text/javascript">
		window.plugin_url = "<?php echo plugins_url(); ?>";
	</script>
    
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
<img src="<?php echo plugin_dir_url( __FILE__ ); ?>img/imagegif.gif" style="position:absolute; top:70%; left:47%; z-index:500; display:none;" id="loader" />
  <div class="pop-back" style="display:none;"></div>
  <div class="popu" style="display:none;" id="stock">
  
   <h5 style="margin-left:3%; margin-top:2%;">Enter Stock Symbol</h5>
   <div class="row" style="margin-top:4%;">
  
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-12 large-3 medium-4 columns">
          <span class="prefix">Stock Symbol</span>
        </div>
        <div class="small-12 large-9 medium-8 columns">
          <input type="text" name="stock" id="symbol" value="" autocomplete="off" />
        </div>
      </div>
    </div>
	</div>
    <div class="small-5 large-5 columns">
          <a href="javascript::" class="button postfix" id="select">Submit</a>
        </div>
	 <div class="small-5 large-5 columns">
          <a href="javascript::" class="button postfix cancel">Cancel</a>
        </div>

  </div>
  
  
  
  <div class="popu" style="display:none;" id="temp">
  
   <h5 style="margin-left:3%; margin-top:2%;">Enter Your City</h5>
   <div class="row" style="margin-top:4%;">
  
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-12 large-3 medium-3 columns">
          <span class="prefix">Your City</span>
        </div>
        <div class="small-12 large-9 medium-9 left columns">
          <input type="text" name="temperature" id="pop_city" value="" />
        </div>
      </div>
    </div>
	</div>
    <div class="small-5 large-5 left columns">
          <a href="javascript::" class="button postfix" id="select_city">Submit</a>
        </div>
	 <div class="small-5 large-5 left columns">
          <a href="javascript::" class="button postfix cancel">Cancel</a>
        </div>

  </div>
  
    <div class="background"><img class="hide-for-small-only" src="<?php echo plugin_dir_url( __FILE__ ); ?>img/bg.jpg"/>
	</div>
    
    <div class="row">
    <!--<div class="background-canv medium-9 small-9 large-4"></div>-->
        <div class=" columns large-6  medium-8 small-8 ikpos" style="z-index:10; position:relative;"  >
        <h3 style="color:#fff !important;" id="title_text">iKeyPass Login</h3>
  <div id="login_fields" style="display:block;">
   <div class="row" style="display:none;">
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-3 columns">
          <span class="prefix">Email ID</span>
        </div>
        <div class="small-9 columns">
          <input type="hidden" placeholder="Enter Email ID" id="email_id" value="<?php echo get_option('admin_email'); ?>" />
          <input type="hidden" name="site_url" id="site_url" value="<?php echo get_site_url(); ?>" />
        </div>
      </div>
    </div>
	</div>
    
    <div class="row">
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-12 large-3 medium-3 columns">
          <span class="prefix">Symbol</span>
        </div>
        <div class="small-12 medium-7 left columns">
			<select name="formula_list" id="ptype">
				<option value="null">Select Passcode Symbol</option>
				<option value="time" id="tm"></option>
				<option value="TEMP">Enter Temperature</option>
				<option value="STSM">Enter Stock Symbol</option>
            </select>
        </div>
      </div>
    </div>
    </div>
    
    
    
     <div class="row">
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-4 medium-3 large-3 columns">
          <span class="prefix">Value</span>
        </div>
        <div class="small-8 medium-5 large-5 left columns">
          <input type="text" name="value" id="value" value="" readonly />
        </div>
		
        <div class="small-12 large-2 medium-2 left columns">
		<a href="#" class="button postfix" id="select_ptype">Re-Enter</a>
		</div>
        
      </div>
    </div>
	</div>
    
    <div class="row">
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-12 large-3 medium-3 columns">
          <span class="prefix">PassCode</span>
        </div>
        <div class="small-12 medium-7 left columns">
          <input type="text" placeholder="Enter Your PassCode..." id="final_val" maxlength="10">
        </div>
      </div>
    </div>
    </div>
    
  		<div class="small-12 large-10 medium-4 columns">
          <a href="javascript::" class="button postfix" id="iKeyPass-login">Login</a>
        </div>
        
  </div>
  
  <div id="forget_form" style="display:none;">
  	<div class="row">
    <div class="large-12 columns">
      <div class="row collapse prefix-radius">
        <div class="small-3 columns">
          <span class="prefix">Email ID</span>
        </div>
        <div class="small-9 medium-6 large-4  columns">
          <input type="text" placeholder="Enter Email ID" id="femail_id" />
          <input type="hidden" name="site_url" id="site_url" value="<?php echo get_site_url(); ?>" />
        </div>
      </div>
    </div>
    
    
    <!--<div class="small-2 large-12 columns">
          <a href="javascript::" class="button postfix" id="bbsend_mail">Send Mail</a>
        </div>-->
    
    
	</div>
  </div>
  
  
  
        <div class="small-12 medium-6 large-10 columns" style="margin-top:-2%;">
          <a href="javascript::" style="color:#FFF;" id="send_mail">Forgot your passcode?<br/><span style="font-size:10px;">(click to send reset mail)</span></a>
        </div>
         <div class="small-12 medium-12 large-12 columns">
	<span style="font-size:13px; display:inline-block; padding-top:10px; text-align:center; width: 77%; margin:auto">If you do not want to login click <a href="javascript::" id="cancel_login" style="text-decoration:underline">Cancel</a></span>
         </div> 
          <a href="javascript::" style="margin-left:37%; display:none;" id="cancel_forgot">Back to login!</a>
            <br />
            <br /><br /><br /><br /><br />
            For additional information on iKeyPass Security Protection for your client websites, <a href="http://www.ikeypass.com/developer.php">click here</a> to download the API and instructions from our developers’ portal.

    </div>
