import re

def get_modules():
    with open('c:/Actecal/erp-ui/src/data/appModules.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    return re.findall(r"createModule\(\s*'([^']+)',\s*'([^']+)'", content)

def get_menu_items():
    with open('c:/Actecal/erp-ui/src/components/AppsMegaMenu.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    item_lists = re.findall(r"items:\s*\[(.*?)\]", content, re.DOTALL)
    items = []
    for il in item_lists:
        items.extend([i.strip().replace("'", "").replace('"', '') for i in il.split(',')])
    return items

modules = get_modules()
menu_items = get_menu_items()

module_names = [m[1] for m in modules]

missing = [m for m in module_names if m not in menu_items]
extra = [m for m in menu_items if m not in module_names]

# POS Shop -> POS Shop (exact)
# Spreadsheet (BI) -> Spreadsheetbi (slug)
# POS Shop and POS Restaurant are separate in modules?

print(f"MODULES: {sorted(module_names)}")
print(f"MENU: {sorted(menu_items)}")
print(f"MISSING IN MENU: {missing}")
print(f"EXTRA IN MENU (Maybe renamed): {extra}")
