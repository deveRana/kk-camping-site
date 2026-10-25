#!/bin/bash
echo "🚀 Importing Cafe Menu to Sanity..."
echo ""
sanity dataset import ../kk-camping-site/sanity/cafe-menu-import.ndjson production
echo ""
echo "✅ Import complete! Visit your Sanity Studio to see the menu items."
