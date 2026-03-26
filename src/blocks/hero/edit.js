import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		headingBefore, typewriterWords, subtitle,
		emailPlaceholder, buttonText, hintText,
		photoId, photoUrl, scrollTarget,
	} = attributes;

	const blockProps = useBlockProps( { className: 'hero' } );

	const headingLines = headingBefore.split( '\n' );

	const updateWord = ( idx, value ) => {
		const updated = [ ...typewriterWords ];
		updated[ idx ] = value;
		setAttributes( { typewriterWords: updated } );
	};

	const addWord = () => {
		setAttributes( { typewriterWords: [ ...typewriterWords, 'New Word' ] } );
	};

	const removeWord = ( idx ) => {
		setAttributes( { typewriterWords: typewriterWords.filter( ( _, i ) => i !== idx ) } );
	};

	const onSelectPhoto = ( media ) => {
		setAttributes( { photoId: media.id, photoUrl: media.url } );
	};

	const onRemovePhoto = () => {
		setAttributes( { photoId: 0, photoUrl: '' } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Heading', 'as-theme' ) }>
					<TextareaControl
						label={ __( 'Heading text (before typewriter)', 'as-theme' ) }
						help={ __( 'Use line breaks to split lines.', 'as-theme' ) }
						value={ headingBefore }
						onChange={ ( val ) => setAttributes( { headingBefore: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Typewriter Words', 'as-theme' ) }>
					{ typewriterWords.map( ( word, i ) => (
						<div key={ i } style={ { display: 'flex', gap: '6px', marginBottom: '6px', alignItems: 'flex-start' } }>
							<div style={ { flex: 1 } }>
								<TextControl
									value={ word }
									onChange={ ( val ) => updateWord( i, val ) }
									__nextHasNoMarginBottom
								/>
							</div>
							<Button
								isDestructive
								variant="tertiary"
								onClick={ () => removeWord( i ) }
								style={ { minHeight: '36px', padding: '0 8px' } }
							>✕</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addWord } style={ { marginTop: '4px' } }>
						{ __( 'Add Word', 'as-theme' ) }
					</Button>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'as-theme' ) }>
					<TextareaControl
						label={ __( 'Subtitle', 'as-theme' ) }
						value={ subtitle }
						onChange={ ( val ) => setAttributes( { subtitle: val } ) }
					/>
					<TextControl
						label={ __( 'Email Placeholder', 'as-theme' ) }
						value={ emailPlaceholder }
						onChange={ ( val ) => setAttributes( { emailPlaceholder: val } ) }
					/>
					<TextControl
						label={ __( 'Button Text', 'as-theme' ) }
						value={ buttonText }
						onChange={ ( val ) => setAttributes( { buttonText: val } ) }
					/>
					<TextControl
						label={ __( 'Hint Text', 'as-theme' ) }
						value={ hintText }
						onChange={ ( val ) => setAttributes( { hintText: val } ) }
					/>
					<TextControl
						label={ __( 'Scroll Target', 'as-theme' ) }
						value={ scrollTarget }
						onChange={ ( val ) => setAttributes( { scrollTarget: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Photo', 'as-theme' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectPhoto }
							allowedTypes={ [ 'image' ] }
							value={ photoId }
							render={ ( { open } ) => (
								<div>
									{ photoUrl ? (
										<div style={ { marginBottom: '12px' } }>
											<img src={ photoUrl } alt="" style={ { width: '100%', borderRadius: '4px' } } />
											<div style={ { display: 'flex', gap: '8px', marginTop: '8px' } }>
												<Button variant="secondary" onClick={ open }>
													{ __( 'Replace', 'as-theme' ) }
												</Button>
												<Button isDestructive variant="link" onClick={ onRemovePhoto }>
													{ __( 'Remove', 'as-theme' ) }
												</Button>
											</div>
										</div>
									) : (
										<Button variant="secondary" onClick={ open }>
											{ __( 'Select Photo', 'as-theme' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="hero-lines">
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
					<div className="line"></div>
				</div>
				{ photoUrl && (
					<div className="hero-bg-photo">
						<img src={ photoUrl } alt="" className="hero-photo-img" />
					</div>
				) }
				<div className="container">
					<div className="hero-content">
						<h1>
							{ headingLines.map( ( line, i ) => (
								<span key={ i } style={ { color: 'inherit' } }>{ line }{ i < headingLines.length - 1 && <br /> }</span>
							) ) }
							<br />
							<span className="typewriter" style={ { display: 'inline-block' } }>
								{ typewriterWords[ 0 ] || 'Web Design' }
							</span>
						</h1>
						<p className="hero-sub">{ subtitle }</p>
						<div className="hero-form" style={ { pointerEvents: 'none' } }>
							<input type="email" placeholder={ emailPlaceholder } readOnly />
							<button type="button">{ buttonText }</button>
						</div>
						<p className="hero-hint">{ hintText }</p>
					</div>
				</div>
				<div className="hero-notch">
					<svg viewBox="0 0 305.73 74.13" preserveAspectRatio="none" className="hero-notch-svg">
						<path d="M152.87,0C89.1,0,87.12,74.13,0,74.13h305.73C218.61,74.13,216.63,0,152.87,0Z" fill="currentColor" />
					</svg>
					<span className="scroll-indicator">
						<span className="scroll-mouse"></span>
					</span>
				</div>
			</div>
		</>
	);
}
