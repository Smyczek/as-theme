import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl, ToggleControl, FocalPointPicker, ColorPicker, BaseControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { tag, title, quote, description, tags, buttonText, buttonUrl, availability, imageId, imageUrl, imageFocalPoint, theme, reversed, bgColor, accentColor, hoverColor, textColor, buttonTextColor } = attributes;

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

	const focalPoint = imageFocalPoint || { x: 0.5, y: 0.5 };

	const cardStyle = {};
	if ( bgColor ) {
		cardStyle.backgroundColor = bgColor;
	}

	const btnStyle = {};
	if ( accentColor ) {
		btnStyle.backgroundColor = accentColor;
	}
	if ( buttonTextColor ) {
		btnStyle.color = buttonTextColor;
	}

	const tagStyle = {};
	if ( accentColor ) {
		tagStyle.color = accentColor;
	}

	const titleStyle = {};
	const descStyle = {};
	if ( textColor ) {
		titleStyle.color = textColor;
		descStyle.color = textColor;
	}

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
				<PanelBody title={ __( 'Colors', 'as-theme' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Background Color', 'as-theme' ) }>
						<ColorPicker
							color={ bgColor || ( theme === 'dark' ? '#1a1d27' : '#ffffff' ) }
							onChange={ ( val ) => setAttributes( { bgColor: val } ) }
							enableAlpha
						/>
						{ bgColor && (
							<Button variant="link" isDestructive onClick={ () => setAttributes( { bgColor: '' } ) } style={ { marginTop: '4px' } }>
								{ __( 'Reset to default', 'as-theme' ) }
							</Button>
						) }
					</BaseControl>
					<BaseControl label={ __( 'Accent Color (tag, button)', 'as-theme' ) }>
						<ColorPicker
							color={ accentColor || '#f16232' }
							onChange={ ( val ) => setAttributes( { accentColor: val } ) }
							enableAlpha
						/>
						{ accentColor && (
							<Button variant="link" isDestructive onClick={ () => setAttributes( { accentColor: '' } ) } style={ { marginTop: '4px' } }>
								{ __( 'Reset to default', 'as-theme' ) }
							</Button>
						) }
					</BaseControl>
					<BaseControl label={ __( 'Button Hover Color', 'as-theme' ) }>
						<ColorPicker
							color={ hoverColor || '#e04f1f' }
							onChange={ ( val ) => setAttributes( { hoverColor: val } ) }
							enableAlpha
						/>
						{ hoverColor && (
							<Button variant="link" isDestructive onClick={ () => setAttributes( { hoverColor: '' } ) } style={ { marginTop: '4px' } }>
								{ __( 'Reset to default', 'as-theme' ) }
							</Button>
						) }
					</BaseControl>
					<BaseControl label={ __( 'Text Color (title, quote, description)', 'as-theme' ) }>
						<ColorPicker
							color={ textColor || ( theme === 'dark' ? '#ffffff' : '#1a1d27' ) }
							onChange={ ( val ) => setAttributes( { textColor: val } ) }
							enableAlpha
						/>
						{ textColor && (
							<Button variant="link" isDestructive onClick={ () => setAttributes( { textColor: '' } ) } style={ { marginTop: '4px' } }>
								{ __( 'Reset to default', 'as-theme' ) }
							</Button>
						) }
					</BaseControl>
					<BaseControl label={ __( 'Button Text Color', 'as-theme' ) }>
						<ColorPicker
							color={ buttonTextColor || '#ffffff' }
							onChange={ ( val ) => setAttributes( { buttonTextColor: val } ) }
							enableAlpha
						/>
						{ buttonTextColor && (
							<Button variant="link" isDestructive onClick={ () => setAttributes( { buttonTextColor: '' } ) } style={ { marginTop: '4px' } }>
								{ __( 'Reset to default', 'as-theme' ) }
							</Button>
						) }
					</BaseControl>
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
					{ imageUrl && (
						<div style={ { marginTop: '16px' } }>
							<FocalPointPicker
								label={ __( 'Image Position', 'as-theme' ) }
								url={ imageUrl }
								value={ focalPoint }
								onChange={ ( val ) => setAttributes( { imageFocalPoint: val } ) }
							/>
						</div>
					) }
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
						<div key={ i } style={ { display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' } }>
							<TextControl
								value={ t }
								onChange={ ( val ) => updateTag( i, val ) }
								__nextHasNoMarginBottom
								style={ { flex: 1 } }
							/>
							<Button
								isDestructive
								variant="tertiary"
								onClick={ () => removeTag( i ) }
								style={ { marginTop: '6px', minWidth: '24px', height: '24px', padding: 0 } }
							>✕</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addTag }>
						{ __( 'Add Tag', 'as-theme' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="container">
					<div className="murmlo-card" style={ cardStyle }>
						<div className="murmlo-inner">
							<div className="murmlo-text">
								<RichText
									tagName="span"
									className="tag"
									value={ tag }
									onChange={ ( val ) => setAttributes( { tag: val } ) }
									allowedFormats={ [] }
									style={ tagStyle }
								/>
								<RichText
									tagName="h2"
									value={ title }
									onChange={ ( val ) => setAttributes( { title: val } ) }
									allowedFormats={ [] }
									style={ titleStyle }
								/>
								<RichText
									tagName="p"
									className="murmlo-quote"
									value={ quote }
									onChange={ ( val ) => setAttributes( { quote: val } ) }
									allowedFormats={ [] }
									style={ descStyle }
								/>
								<RichText
									tagName="p"
									className="murmlo-desc"
									value={ description }
									onChange={ ( val ) => setAttributes( { description: val } ) }
									allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
									style={ descStyle }
								/>
								<div className="murmlo-tags">
									{ tags.map( ( t, i ) => (
										<span key={ i }>{ t }</span>
									) ) }
								</div>
								<div className="murmlo-btns">
									<a className="btn btn-primary" style={ btnStyle }>{ buttonText } →</a>
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
									<img
										src={ imageUrl }
										alt={ title }
										style={ {
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											objectPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
										} }
									/>
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
