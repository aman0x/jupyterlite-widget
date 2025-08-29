function code() {
  const packageUrl = new URL('../files/package.tar.gz', window.location.href).href;
  const keywardWheelUrl = new URL('../files/keyward-0.6.2-py3-none-any.whl', window.location.href).href;

  // language=Python
  return `
async def __bootstrap_grist(url, keyward_wheel_url):
    from pyodide.http import pyfetch  # noqa
    import io
    import tarfile

    # Download and extract grist package
    response = await pyfetch(url)
    bytes_file = io.BytesIO(await response.bytes())
    with tarfile.open(fileobj=bytes_file) as tar:
        tar.extractall()

    # Install packages
    import micropip
    packages_to_install = [keyward_wheel_url, "requests", "numpy", "pandas", "stash"]

    for package in packages_to_install:
        try:
            await micropip.install(package)
            print(f"Installed: {package}")
        except Exception as e:
            print(f"Failed to install {package}: {e}")

    print("Package installation complete")

    import grist.browser  # noqa
    return grist.browser.grist

grist = await __bootstrap_grist(${JSON.stringify(packageUrl)}, ${JSON.stringify(keywardWheelUrl)})
kwApi =  grist
`;
}

export default code;
