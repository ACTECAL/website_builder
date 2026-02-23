import re

app_modules_path = 'c:/Actecal/erp-ui/src/data/appModules.ts'
mega_menu_path = 'c:/Actecal/erp-ui/src/components/AppsMegaMenu.tsx'

# Read App Modules
with open(app_modules_path, 'r', encoding='utf-8') as f:
    app_modules_content = f.read()

# Extract names from createModule calls
# createModule('accounting', 'Accounting', ...
module_matches = re.findall(r"createModule\(\s*'([^']+)',\s*'([^']+)'", app_modules_content)
all_modules = {name: slug for slug, name in module_matches}

# Read Mega Menu
with open(mega_menu_path, 'r', encoding='utf-8') as f:
    mega_menu_content = f.read()

# Extract items from APPS_DATA
# items: ['Accounting', 'Invoicing', ...
menu_items = re.findall(r"items:\s*\[(.*?)\]", mega_menu_content, re.DOTALL)
all_menu_items = []
for item_list in menu_items:
    items = [i.strip().replace("'", "") for i in item_list.split(',')]
    all_menu_items.extend(items)

print(f"Modules count: {len(all_modules)}")
print(f"Menu items count: {len(all_menu_items)}")

missing_in_menu = [name for name in all_modules if name not in all_menu_items]
extra_in_menu = [name for name in all_menu_items if name not in all_modules]

if missing_in_menu:
    print(f"Missing in Mega Menu: {missing_in_menu}")
else:
    print("All modules are in Mega Menu.")

if extra_in_menu:
    # POS Shop -> POS Shop (normalized)
    print(f"Entries in menu that don't match exactly: {extra_in_menu}")
    
    # Try fuzzy matching (normalized names)
    def normalize(n):
        return n.lower().replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
    
    norm_modules = {normalize(n): n for n in all_modules}
    still_extra = []
    for m in extra_in_menu:
        if normalize(m) not in norm_modules:
            still_extra.append(m)
    
    if still_extra:
        print(f"Still extra in menu: {still_extra}")
    else:
        print("All menu items found via normalization.")
