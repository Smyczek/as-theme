import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl, ToggleControl, ResponsiveWrapper } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tag, title, quote, description, tags, buttonText, buttonUrl, availability, imageId, imageUrl, theme, reversed } = attributes;

	const classes = [
		'murmlo',
		theme === 'light' ? 'murmlo--light' : '',
		reversed ? 'murmlo--reversed' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( { className: classes } );

	const updateTag = ( idx, value ) => {
		const updated = [ ...tags ];
		updated[ idx ] = value;
		setAttributes( { tags: updated } );
	};

	const addTag = () => {
		setAttributes( { tags: [ ...tags, 'New Tag' ] } );
	};

	const removeTag = ( idx ) => {
		setAttributes( { tags: tags.filter( ( _, i ) => i !== idx ) } );
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			imageId: media.id,
			imageUrl: media.url,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			imageId: 0,
			imageUrl: '',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Appearance', 'as-theme' ) }>
					<SelectControl
						label={ __( 'Theme', 'as-theme' ) }
						value={ theme }
						options={ [
							{ label: 'Dark', value: 'dark' },
							{ label: 'Light', value: 'light' },
						] }
						onChange={ ( val ) => setAttributes( { theme: val } ) }
					/>
					<ToggleControl
						label={ __( 'Reverse columns', 'as-theme' ) }
						help={ reversed ? __( 'Image left, text right', 'as-theme' ) : __( 'Text left, image right', 'as-theme' ) }
						checked={ reversed }
						onChange={ ( val ) => setAttributes( { reversed: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Image', 'as-theme' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div>
									{ imageUrl ? (
										<div style={ { marginBottom: '12px' } }>
											<img src={ imageUrl } alt="" style={ { width: '100%', borderRadius: '4px' } } />
											<div style={ { display: 'flex', gap: '8px', marginTop: '8px' } }>
												<Button variant="secondary" onClick={ open }>
													{ __( 'Replace', 'as-theme' ) }
												</Button>
												<Button isDestructive variant="link" onClick={ onRemoveImage }>
													{ __( 'Remove', 'as-theme' ) }
												</Button>
											</div>
										</div>
									) : (
										<Button variant="secondary" onClick={ open }>
											{ __( 'Select Image', 'as-theme' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title={ __( 'Button', 'as-theme' ) }>
					<TextControl
						label={ __( 'Button Text', 'as-theme' ) }
						value={ buttonText }
						onChange={ ( val ) => setAttributes( { buttonText: val } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'as-theme' ) }
						value={ buttonUrl }
						onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Tags', 'as-theme' ) } initialOpen={ false }>
					{ tags.map( ( t, i ) => (
						<div key={ i } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' } }>
							<TextControl
								value={ t }
								onChange={ ( val ) => updateTag( i, val ) }
								style={ { flex: 1, marginBottom: 0 } }
							/>
							<Button isDestructive variant="link" onClick={ () => removeTag( i ) }>✕</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addTag }>
						{ __( 'Add Tag', 'as-theme' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<div className="murmlo-card">
						<div className="murmlo-inner">
							<div className="murmlo-text">
								<RichText
									tagName="span"
									className="tag"
									value={ tag }
									onChange={ ( val ) => setAttributes( { tag: val } ) }
									allowedFormats={ [] }
								/>
								<RichText
									tagName="h2"
									value={ title }
									onChange={ ( val ) => setAttributes( { title: val } ) }
									allowedFormats={ [] }
								/>
								<RichText
									tagName="p"
									className="murmlo-quote"
									value={ quote }
									onChange={ ( val ) => setAttributes( { quote: val } ) }
									allowedFormats={ [] }
								/>
								<RichText
									tagName="p"
									className="murmlo-desc"
									value={ description }
									onChange={ ( val ) => setAttributes( { description: val } ) }
									allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
								/>
								<div className="murmlo-tags">
									{ tags.map( ( t, i ) => (
										<span key={ i }>{ t }</span>
									) ) }
								</div>
								<div className="murmlo-btns">
									<a className="btn btn-primary">{ buttonText } →</a>
								</div>
								<RichText
									tagName="p"
									className="murmlo-avail"
									value={ availability }
									onChange={ ( val ) => setAttributes( { availability: val } ) }
									allowedFormats={ [] }
								/>
							</div>
							<div className="murmlo-visual">
								{ imageUrl ? (
									<img src={ imageUrl } alt={ title } style={ { width: '100%', height: '100%', objectFit: 'cover' } } />
								) : (
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ onSelectImage }
											allowedTypes={ [ 'image' ] }
											value={ imageId }
											render={ ( { open } ) => (
												<Button
													onClick={ open }
													variant="secondary"
													style={ { margin: 'auto' } }
												>
													{ __( 'Upload Image', 'as-theme' ) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
