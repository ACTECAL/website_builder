import os
import re

app_tsx_path = 'c:/Actecal/erp-ui/src/App.tsx'
app_modules_path = 'c:/Actecal/erp-ui/src/data/appModules.ts'
apps_dir = 'c:/Actecal/erp-ui/src/pages/apps'

# Read App.tsx
with open(app_tsx_path, 'r', encoding='utf-8') as f:
    app_tsx = f.read()

# Read appModules.ts
with open(app_modules_path, 'r', encoding='utf-8') as f:
    app_modules_content = f.read()

# Extract slugs from createModule calls
# createModule('accounting', ...
slugs = re.findall(r"createModule\(\s*'([^']+)'", app_modules_content)

# Extract routes from App.tsx
# <Route path="/apps/accounting"
routes = re.findall(r'<Route path="/apps/([^"]+)"', app_tsx)

print(f"Total modules in appModules.ts: {len(slugs)}")
print(f"Total /apps/ routes in App.tsx: {len(routes)}")

missing_routes = [s for s in slugs if s not in routes]
extra_routes = [r for r in routes if r not in slugs]

if missing_routes:
    print(f"Missing routes in App.tsx: {missing_routes}")
else:
    print("All slugs have routes in App.tsx.")

if extra_routes:
    print(f"Extra routes in App.tsx: {extra_routes}")

# Check files in src/pages/apps
files = os.listdir(apps_dir)
file_basenames = [f.replace('.tsx', '').lower() for f in files]

missing_files = []
for slug in slugs:
    # Handle cases like 'spreadsheet-bi' -> 'Spreadsheetbi.tsx'
    normalized_slug = slug.replace('-', '').lower()
    if normalized_slug not in file_basenames:
       missing_files.append(slug)

if missing_files:
    print(f"Missing files in src/pages/apps: {missing_files}")
else:
    print("All slugs have corresponding files (normalized check).")

# Check for formatting issues in App.tsx (like the double route on one line)
lines_with_multiple_routes = []
for i, line in enumerate(app_tsx.splitlines()):
    if line.count('<Route') > 1:
        lines_with_multiple_routes.append((i+1, line))

if lines_with_multiple_routes:
    print(f"Lines with multiple routes: {lines_with_multiple_routes}")
