## Run

```bash
# Copy sample extension locally
npx degit why-arong/hypervisor-config hypervisor-config

# Navigate into sample directory
cd hypervisor-config

# Install dependencies for both the extension and webview UI source code
npm run install:all

# Build webview UI source code
npm run build:webview

# Open sample in VS Code
code .
```

Once the sample is open inside VS Code you can run the extension by doing the following:

1. Press `F5` to open a new Extension Development Host window
2. Inside the host window, open the folder containing the "config.yml" file
3. When you click on the "config.yml", the UI will be rendered.
4. After finishing your configuratins, you can click the "Generate" buton to apply the changes to the "config.yml" file.
