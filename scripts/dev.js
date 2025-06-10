import { spawn } from 'child_process';
import { platform } from 'os';

// A helper function to run commands and stream their output
function run(command, args = []) {
  return new Promise((resolve, reject) => {
    // Safer command execution for different platforms
    const isWindows = platform() === 'win32';
    const cmd = isWindows ? 'cmd' : 'sh';
    const cmdArgs = isWindows ? ['/c', command, ...args] : ['-c', `${command} ${args.join(' ')}`];
    
    const proc = spawn(cmd, cmdArgs, {
      stdio: 'inherit',
      windowsHide: true
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`Command '${command} ${args.join(' ')}' failed with exit code ${code}`);
        reject(new Error(`Exit code ${code}`));
      }
    });

    proc.on('error', (err) => {
      console.error(`Failed to start command '${command}':`, err);
      reject(err);
    });
  });
}

async function startDev() {
  try {
    console.log('Checking and updating browserslist database...');
    await run('npx', ['--yes', 'update-browserslist-db@latest']);
    
    console.log('\nStarting Vite development server...');
    await run('npx', ['vite']);
  } catch (error) {
    console.error('\nFailed to start development server.');
    process.exit(1);
  }
}

startDev();
