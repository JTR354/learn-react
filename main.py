import time
import pyautogui

if __name__ == "__main__":
    pyautogui.FAILSAFE = False
    count = 0
    while count < 1000:
        print(count)
        count = count + 1
        pyautogui.click()
        # time.sleep(0)
