class DeviceOrientation
{
	static event = null;
	
	static isPortrait()
	{
		if(Math.abs(DeviceOrientation.event.gamma) <= 45)
		{
			if((Math.abs(DeviceOrientation.event.beta) > 10) && (Math.abs(DeviceOrientation.event.beta) < 150))
			{
				return true;
			}
		}
		if(Math.abs(Math.abs(DeviceOrientation.event.gamma) - Math.abs(DeviceOrientation.event.beta)) <= 20)
		{
			return true;
		}
		return false;
	}
}

try
{
	window.addEventListener('deviceorientation', (event) =>
	{
		DeviceOrientation.event = event;
	}, false);
}
catch(e)
{
    Logger.error(e);
}
