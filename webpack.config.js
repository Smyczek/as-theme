const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const glob = require( 'glob' );

// Auto-discover all blocks in src/blocks/*/index.js
const blockEntries = {};
const blockDirs = glob.sync( './src/blocks/*/index.js' );
blockDirs.forEach( ( file ) => {
	const name = file.match( /\/blocks\/([^/]+)\// )[ 1 ];
	blockEntries[ `blocks/${ name }/index` ] = path.resolve( process.cwd(), file );
} );

module.exports = {
	...defaultConfig,
	entry: {
		...blockEntries,
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( process.cwd(), 'build' ),
	},
};
