# my-spreadsheet-app
Spreadsheet Application

# Overview
This is a web-based spreadsheet application built with Next.js and Tailwind CSS. It supports basic features such as cell formatting, search and filter, undo/redo functionality, and data validation.

# Features
Cell Formatting: Customize background color, text alignment, and font size.
Search and Filter: Quickly locate specific data within the grid.
Undo/Redo: Revert and reapply changes made to the cells.
Data Validation: Restrict cell input to numeric values or specific text formats.

# Prerequisites
Node.js (v18 or later)
npm 

# Clone the Repository
git clone https://github.com/FatimaSolkar23/my-spreadsheet-app.git
cd my-spreadsheet-app

# Install Dependencies
npm install

# Start the Development Server
npm run dev

The application will be available at 'http://localhost:3000'.

# Usage

Cell Formatting
1. Use the controls at the top of the page to:
Cell Background Color: Choose a color from the color picker.
Text Alignment: Select left, center, or right alignment.
Font Size: Enter a font size between 8 and 36 pixels.

2.The formatting will be applied to all cells in the grid.

Search and Filter
1. Enter a search query in the "Search" input field.
2.The grid will automatically filter to show only the cells that contain the search query.

Undo and Redo
1.Undo: Click the "Undo" button to revert the last change made to the grid. This button will be disabled if there are no actions to undo.
2.Redo: Click the "Redo" button to reapply the last undone change. This button will be disabled if there are no actions to redo.

Data Validation
1.Cells in even-numbered columns are restricted to numeric values.
2.Cells in odd-numbered columns are restricted to alphanumeric text.
