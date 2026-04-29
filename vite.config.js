import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import fs from 'fs';

function concatVendorPlugin(files, outputPath) {
    return {
        name: 'concat-vendor',
        async buildStart() {
            const contents = files.map(f => fs.readFileSync(f, 'utf-8'));
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, contents.join('\n;\n'));
        },
        configureServer(server) {
            // Also run on dev server start
            const contents = files.map(f => fs.readFileSync(f, 'utf-8'));
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, contents.join('\n;\n'));
        },
    };
}

const vendorFiles = [
    'resources/js/jquery.min.js',
    'resources/js/jquery-migrate-3.0.1.min.js',
    'resources/js/popper.min.js',
    'resources/js/bootstrap.min.js',
    'resources/js/jquery.easing.1.3.js',
    'resources/js/jquery.waypoints.min.js',
    'resources/js/jquery.stellar.min.js',
    'resources/js/owl.carousel.min.js',
    'resources/js/jquery.magnific-popup.min.js',
    'resources/js/aos.js',
    'resources/js/jquery.mb.YTPlayer.min.js',
    'resources/js/scrollax.min.js',
    'resources/js/app.js',
].map(f => path.resolve(__dirname, f));

export default defineConfig({
    css: {
        lightningcss: {
            errorRecovery: true,
        },
    },
    build: {
        sourcemap: false,
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'EVAL' && warning.id?.includes('resources/js')) {
                    return;
                }
                warn(warning);
            },
        },
    },
    plugins: [
        laravel({
            input: ['resources/js/main.js', 'resources/sass/app.scss'],
            refresh: [
                'resources/js/app.js',
                'resources/views/**',
            ],
        }),
        concatVendorPlugin(vendorFiles, 'public/js/vendor.js'),
        viteStaticCopy({
            targets: [
                {
                    src: 'resources/img/**/*',
                    dest: 'images',
                    rename: { stripBase: 2 },
                }
            ]
        }),
        tailwindcss(),
    ],
    optimizeDeps: {
        include: [],
    },
    define: {
        global: 'window',
        globalThis: 'window',
    },
    resolve: {
        alias: {
            'jquery': path.resolve(__dirname, 'resources/js/jquery.min.js'),
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        sourcemapIgnoreList: (sourcePath) => sourcePath.includes('resources/js'),
    },
});
