import subprocess, sys

def connect():
    '''
    Checks for the IP Address of the WiFi Hotspot Server
    All errors in connection are handled
    '''
    raw = subprocess.check_output('ipconfig',shell=True) # runs 'ipconfig' on cmd
    text = raw.decode('utf-8') # decode to string
    lines = []
    for line in text.splitlines():
        lines.append(line.lower())
    try:
        # Check if adapter is availabe
        wifi_index = lines.index('wireless lan adapter wi-fi:')
        wifi_info = lines[wifi_index:len(lines)]
    except ValueError:
        try:
            # Windows 11 Support
            wifi_index = lines.index('wireless lan adapter wi fi:')
            wifi_info = lines[wifi_index:len(lines)]
        except ValueError:
            try:
                # Any other version of Windows apart from 10 and 11
                final_adapter = None
                for line in lines:
                    if 'wi-fi' in lines or 'wi fi' in lines:
                        final_adapter = line
                if final_adapter:
                    wifi_index = lines.index(final_adapter)
                    wifi_info = lines[wifi_index:len(lines)]
                else: raise ValueError
            except ValueError:
                # If WiFi adapter is not available
                sys.exit(1)
                
    
    try:
        # Check if it is  connected to a network
        test_index = wifi_index + 2
        if lines[test_index].endswith('media disconnected'):
            raise ConnectionError
        gateway = ''
        for line in wifi_info:
            if 'default gateway' in line:
                gateway = line
                break

        if gateway =='':
            raise ConnectionError
        
        if gateway.count(':')>1: # IpV6 address detected
            try:
                gateway = wifi_info[wifi_info.index(gateway)+1].strip()
            except IndexError:
                raise ConnectionError
        
    except ConnectionError:
        # If it is not connected
        sys.exit(2)
        
    
    # If all conditions are positive the final Url is set
    url = 'http://'+gateway.split(':')[-1].strip()+':33455'
    sys.stdout.write(url)

connect()