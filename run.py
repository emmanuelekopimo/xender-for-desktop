import subprocess, os
_ = subprocess.check_output('neu build', shell=True)
os.chdir('C:/Users/user/Documents/xender_for_pc/dist/xender_for_pc')
os.startfile('C:/Users/user/Documents/xender_for_pc/dist/xender_for_pc/xender_for_pc-win_x64.exe')