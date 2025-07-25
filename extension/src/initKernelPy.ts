function code() {
  const packageUrl = new URL('../files/package.tar.gz', window.location.href)
    .href;

  // language=Python
  return `
print("Installing packages...")
import micropip
await micropip.install([
    'requests',
    'numpy',
    'pandas',
    'https://raw.githubusercontent.com/aman0x/package.whl/main/keyward-0.1.0-py3-none-any.whl'
])
print("Packages installed successfully")

async def __bootstrap_grist(url):
    from pyodide.http import pyfetch  # noqa
    import io
    import tarfile

    response = await pyfetch(url)
    bytes_file = io.BytesIO(await response.bytes())
    with tarfile.open(fileobj=bytes_file) as tar:
        tar.extractall()

    import grist.browser  # noqa
    return grist.browser.grist

grist = await __bootstrap_grist(${JSON.stringify(packageUrl)})
kw_api = grist
print("Bootstrap complete")
`;
}

export default code;
