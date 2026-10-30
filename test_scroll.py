from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument('--headless=new')
options.add_argument('--window-size=1440,900')
driver = webdriver.Chrome(options=options)

driver.get('http://localhost:4173')
time.sleep(2)

logs = driver.get_log('browser')
print('Browser console logs:')
for l in logs:
    print(l)

total_h = driver.execute_script('return document.documentElement.scrollHeight')
print('Document scrollHeight:', total_h)

spacers = driver.execute_script('return document.querySelectorAll(".pin-spacer").length')
print('Pin-spacers count at start:', spacers)

# Let's see what components exist and how they scroll
works_elem = driver.execute_script('return !!document.getElementById("works")')
print('Works element exists:', works_elem)

for y in [0, 800, 1600, 2400, 3200, 4200, 5500]:
    driver.execute_script(f'window.scrollTo(0, {y})')
    time.sleep(0.3)
    curr_y = driver.execute_script('return window.scrollY')
    print(f'Target Y={y}, Actual scrollY={curr_y}')

driver.quit()
