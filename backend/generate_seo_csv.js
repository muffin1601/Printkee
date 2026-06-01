const categoryData = require('./data/categoryData');
const fs = require('fs');

const rows = [];
rows.push(['Type', 'Category Name', 'Subcategory Name', 'Meta Title', 'Meta Description']);

categoryData.forEach(cat => {
    rows.push(['Category', cat.name, '', cat.seo?.metaTitle || '', cat.seo?.metaDescription || '']);
    if (cat.subcategories) {
        cat.subcategories.forEach(sub => {
            rows.push(['Subcategory', cat.name, sub.name, sub.seo?.metaTitle || '', sub.seo?.metaDescription || '']);
        });
    }
});

const csvContent = rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
fs.writeFileSync('category_seo_metadata.csv', csvContent);
console.log('CSV file generated: category_seo_metadata.csv');
