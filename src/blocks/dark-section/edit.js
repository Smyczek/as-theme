import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { platformsLabel, platforms, stats, toolsLabel, tools, marqueeSpeed } = attributes;
	const blockProps = useBlockProps( { className: 'dark-section' } );

	// Generic array helpers
	const updateItem = ( key, arr, idx, field, value ) => {
		const updated = [ ...arr ];
		updated[ idx ] = { ...updated[ idx ], [ field ]: value };
		setAttributes( { [ key ]: updated } );
	};
	const removeItem = ( key, arr, idx ) => {
		setAttributes( { [ key ]: arr.filter( ( _, i ) => i !== idx ) } );
	};
	const moveItem = ( key, arr, idx, dir ) => {
		const updated = [ ...arr ];
		const t = idx + dir;
		if ( t < 0 || t >= updated.length ) return;
		[ updated[ idx ], updated[ t ] ] = [ updated[ t ], updated[ idx ] ];
		setAttributes( { [ key ]: updated } );
	};

	return (
		<>
			<InspectorControls>
				{ /* ── Platforms ── */ }
				<PanelBody title={ __( 'Platforms', 'as-theme' ) }>
					<TextControl
						label={ __( 'Section Label', 'as-theme' ) }
						value={ platformsLabel }
						onChange={ ( val ) => setAttributes( { platformsLabel: val } ) }
						__nextHasNoMarginBottom
					/>
					{ platforms.map( ( p, i ) => (
						<div key={ i } style={ { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e0e0e0' } }>
							<TextControl label={ __( 'Title', 'as-theme' ) } value={ p.title } onChange={ ( val ) => updateItem( 'platforms', platforms, i, 'title', val ) } __nextHasNoMarginBottom />
							<TextControl label={ __( 'URL', 'as-theme' ) } value={ p.url } onChange={ ( val ) => updateItem( 'platforms', platforms, i, 'url', val ) } __nextHasNoMarginBottom />
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => { updateItem( 'platforms', platforms, i, 'imageId', media.id ); updateItem( 'platforms', platforms, i, 'imageUrl', media.url ); } }
									allowedTypes={ [ 'image' ] }
									value={ p.imageId }
									render={ ( { open } ) => (
										<div style={ { marginTop: '8px' } }>
											{ p.imageUrl ? (
												<div style={ { display: 'flex', gap: '8px', alignItems: 'center' } }>
													<img src={ p.imageUrl } alt="" style={ { height: '24px', background: '#333', padding: '4px', borderRadius: '4px' } } />
													<Button variant="secondary" size="small" onClick={ open }>{ __( 'Replace', 'as-theme' ) }</Button>
												</div>
											) : (
												<Button variant="secondary" size="small" onClick={ open }>{ __( 'Select Logo', 'as-theme' ) }</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
							<div style={ { display: 'flex', gap: '4px', marginTop: '8px' } }>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'platforms', platforms, i, -1 ) } disabled={ i === 0 }>↑</Button>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'platforms', platforms, i, 1 ) } disabled={ i === platforms.length - 1 }>↓</Button>
								<Button isDestructive variant="link" size="small" onClick={ () => removeItem( 'platforms', platforms, i ) }>{ __( 'Remove', 'as-theme' ) }</Button>
							</div>
						</div>
					) ) }
					<Button variant="secondary" onClick={ () => setAttributes( { platforms: [ ...platforms, { imageId: 0, imageUrl: '', title: 'New', url: '#' } ] } ) } style={ { marginTop: '12px' } }>
						{ __( 'Add Platform', 'as-theme' ) }
					</Button>
				</PanelBody>

				{ /* ── Stats ── */ }
				<PanelBody title={ __( 'Statistics', 'as-theme' ) } initialOpen={ false }>
					{ stats.map( ( s, i ) => (
						<div key={ i } style={ { marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0e0e0' } }>
							<p style={ { fontWeight: 600, fontSize: '12px', color: '#757575', marginBottom: '8px' } }>{ `#${ i + 1 }` }</p>
							<TextControl label={ __( 'Prefix', 'as-theme' ) } value={ s.prefix } onChange={ ( val ) => updateItem( 'stats', stats, i, 'prefix', val ) } __nextHasNoMarginBottom />
							<TextControl label={ __( 'Value', 'as-theme' ) } type="number" value={ String( s.value ) } onChange={ ( val ) => updateItem( 'stats', stats, i, 'value', parseInt( val ) || 0 ) } __nextHasNoMarginBottom />
							<TextControl label={ __( 'Suffix', 'as-theme' ) } value={ s.suffix } onChange={ ( val ) => updateItem( 'stats', stats, i, 'suffix', val ) } __nextHasNoMarginBottom />
							<TextControl label={ __( 'Label', 'as-theme' ) } value={ s.label } onChange={ ( val ) => updateItem( 'stats', stats, i, 'label', val ) } __nextHasNoMarginBottom />
							<TextControl label={ __( 'Format (comma or empty)', 'as-theme' ) } value={ s.format } onChange={ ( val ) => updateItem( 'stats', stats, i, 'format', val ) } __nextHasNoMarginBottom />
							<div style={ { display: 'flex', gap: '4px', marginTop: '8px' } }>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'stats', stats, i, -1 ) } disabled={ i === 0 }>↑</Button>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'stats', stats, i, 1 ) } disabled={ i === stats.length - 1 }>↓</Button>
								<Button isDestructive variant="link" size="small" onClick={ () => removeItem( 'stats', stats, i ) }>{ __( 'Remove', 'as-theme' ) }</Button>
							</div>
						</div>
					) ) }
					<Button variant="secondary" onClick={ () => setAttributes( { stats: [ ...stats, { prefix: '', value: 0, suffix: '', format: '', label: 'New Stat' } ] } ) }>
						{ __( 'Add Stat', 'as-theme' ) }
					</Button>
				</PanelBody>

				{ /* ── Tools Marquee ── */ }
				<PanelBody title={ __( 'Tools & Technologies', 'as-theme' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Section Label', 'as-theme' ) }
						value={ toolsLabel }
						onChange={ ( val ) => setAttributes( { toolsLabel: val } ) }
						__nextHasNoMarginBottom
					/>
					<RangeControl
						label={ __( 'Marquee Speed (seconds)', 'as-theme' ) }
						value={ marqueeSpeed }
						onChange={ ( val ) => setAttributes( { marqueeSpeed: val } ) }
						min={ 10 }
						max={ 120 }
					/>
					{ tools.map( ( t, i ) => (
						<div key={ i } style={ { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e0e0e0' } }>
							<TextControl label={ __( 'Title', 'as-theme' ) } value={ t.title } onChange={ ( val ) => updateItem( 'tools', tools, i, 'title', val ) } __nextHasNoMarginBottom />
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => { updateItem( 'tools', tools, i, 'imageId', media.id ); updateItem( 'tools', tools, i, 'imageUrl', media.url ); } }
									allowedTypes={ [ 'image' ] }
									value={ t.imageId }
									render={ ( { open } ) => (
										<div style={ { marginTop: '8px' } }>
											{ t.imageUrl ? (
												<div style={ { display: 'flex', gap: '8px', alignItems: 'center' } }>
													<img src={ t.imageUrl } alt="" style={ { height: '24px', background: '#333', padding: '4px', borderRadius: '4px' } } />
													<Button variant="secondary" size="small" onClick={ open }>{ __( 'Replace', 'as-theme' ) }</Button>
												</div>
											) : (
												<Button variant="secondary" size="small" onClick={ open }>{ __( 'Select Logo', 'as-theme' ) }</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
							<div style={ { display: 'flex', gap: '4px', marginTop: '8px' } }>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'tools', tools, i, -1 ) } disabled={ i === 0 }>↑</Button>
								<Button variant="tertiary" size="small" onClick={ () => moveItem( 'tools', tools, i, 1 ) } disabled={ i === tools.length - 1 }>↓</Button>
								<Button isDestructive variant="link" size="small" onClick={ () => removeItem( 'tools', tools, i ) }>{ __( 'Remove', 'as-theme' ) }</Button>
							</div>
						</div>
					) ) }
					<Button variant="secondary" onClick={ () => setAttributes( { tools: [ ...tools, { imageId: 0, imageUrl: '', title: 'New Tool' } ] } ) } style={ { marginTop: '12px' } }>
						{ __( 'Add Tool', 'as-theme' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="dark-glow"></div>
				<div className="dark-glow-2"></div>
				<div className="container">
					<p className="dark-label">{ platformsLabel }</p>
					<div className="logos-row">
						{ platforms.map( ( p, i ) => (
							<span key={ i } className="logo-item" title={ p.title }>
								{ p.imageUrl ? (
									<img src={ p.imageUrl } alt={ p.title } style={ { height: '34px' } } />
								) : (
									<span style={ { color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' } }>{ p.title }</span>
								) }
							</span>
						) ) }
					</div>

					<div className="dark-stats">
						{ stats.map( ( s, i ) => (
							<div key={ i } className="dark-stat">
								<div className="dark-stat-num">
									{ s.prefix && <span className="acc">{ s.prefix }</span> }
									<span>{ s.value.toLocaleString() }</span>
									{ s.suffix && <span className="acc">{ s.suffix }</span> }
								</div>
								<div className="dark-stat-label">{ s.label }</div>
							</div>
						) ) }
					</div>

					<div className="dark-divider"></div>
					<p className="dark-label">{ toolsLabel }</p>
					<div className="logos-row tools-row">
						{ tools.map( ( t, i ) => (
							<span key={ i } className="logo-item" title={ t.title }>
								{ t.imageUrl ? (
									<img src={ t.imageUrl } alt={ t.title } style={ { height: '28px' } } />
								) : (
									<span style={ { color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' } }>{ t.title }</span>
								) }
							</span>
						) ) }
					</div>
				</div>
			</div>
		</>
	);
}
