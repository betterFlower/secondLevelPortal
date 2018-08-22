var webpack = require('webpack');

module.exports = {
   entry: {
      vendors: ['react','react-dom','react-router','reflux','react-bootstrap','react-bootstrap-daterangepicker','moment'],
      index:['babel-polyfill','./app.js']
   },

   output: {
      path:'./dist',
      filename: '[name].js',
      chunkFilename: '[id].chunk.js',
      publicPath: 'dist/'
   },

   devServer: {
      inline: true,
      port: 8888
   },

   module: {
      loaders: [ {
         test: /\.js?$/,
         exclude: /node_modules/,
         loader: 'babel',
         query: {
            plugins:[
               "transform-runtime",
               ["transform-es2015-classes",{"loose":true}],
               "transform-proto-to-assign",
                "transform-es3-property-literals",
                "transform-es3-member-expression-literals",
                "transform-es2015-modules-simple-commonjs"
            ],
            presets: ['es2015', 'react']
         }
      },
         {
            test: /\.json$/,
            loader: 'json-loader'
         },
      {
          test: /\.css$/,loader: 'style-loader!css-loader'
      }]
   },
   plugins: [
      new webpack.DefinePlugin({
         'process.env':{
            'NODE_ENV': JSON.stringify('production')
         }
      }),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            warnings: false
         }
      })
   ]
};
