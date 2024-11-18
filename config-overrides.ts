import path from 'path';

module.exports = {
    webpack: (config: any) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'pdfmake/build/vfs_fonts': path.resolve(__dirname, 'node_modules/pdfmake/build/vfs_fonts'),
        };
        return config;
    },
};
