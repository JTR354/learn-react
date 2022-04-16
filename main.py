import pyautogui

if __name__ == "__main__":
    pyautogui.FAILSAFE = False
    count = 0
    while True:
        # if count > 1e20:
        #     break
        # print(count)
        count = count + 1
        pyautogui.click(clicks=100, interval=0)
