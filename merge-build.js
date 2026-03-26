/**
 * Post-build script: wp-scripts duplicates the "blocks" directory
 * when using --webpack-src-dir=src/blocks --output-path=build/blocks.
 * This merges build/blocks/blocks/<name>/* into build/blocks/<name>/
 * and removes the nested duplicate.
 */
const fs = require( 'fs' );
const path = require( 'path' );

const nested = path.join( __dirname, 'build', 'blocks', 'blocks' );

if ( ! fs.existsSync( nested ) ) {
	process.exit( 0 );
}

const dirs = fs.readdirSync( nested, { withFileTypes: true } ).filter( d => d.isDirectory() );

for ( const dir of dirs ) {
	const src = path.join( nested, dir.name );
	const dest = path.join( __dirname, 'build', 'blocks', dir.name );

	if ( ! fs.existsSync( dest ) ) {
		fs.mkdirSync( dest, { recursive: true } );
	}

	for ( const file of fs.readdirSync( src ) ) {
		fs.copyFileSync( path.join( src, file ), path.join( dest, file ) );
	}
}

fs.rmSync( nested, { recursive: true, force: true } );
console.log( 'Build merged: blocks assets consolidated.' );
