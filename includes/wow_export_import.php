<div class="qchero_sliders_list_wrapper">
	<div class="sld_menu_title">
		<h2><?php echo esc_html__('Export/Import All Settings', 'qc-opd') ?></h2>
	</div>
			<br>
			<div class="content">
				<h4>Export Settings</h4>
				<p>
					Export button will create a downloadable CSV file with all of your existing settings.
				</p>
				<a class="button-primary" href="<?php echo admin_url( 'admin-post.php?action=woowbotsettings.csv' ); ?>">Export Settings</a>
				
				<div>
				<br>
				<h4>
					<?php echo esc_html__('Upload your backup settings CSV file'); ?>
				</h4>

				<form name="uploadfile" id="uploadfile_form" method="POST" enctype="multipart/form-data" action="" accept-charset="utf-8">
					
					<p>
						<?php echo __('Select file to upload') ?>
						<input type="file" name="woo_csv_upload" id="csv_upload" size="35" class="uploadfiles" required/>
					</p>
					
					<p>
						<input class="button-primary" type="submit" name="woo_upload_csv" id="" value="<?php echo esc_html__('Import Settings') ?>"/>

					</p>

				</form>				
				<?php if(isset($_GET['msg']) && $_GET['msg']=='success'): ?>
				<p style="color:green;font-weight:bold;">Settings imported successfully!</p>
				<?php endif; ?>
				</div>
				
			</div>
</div>
