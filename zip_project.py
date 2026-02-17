import zipfile
import os

def zip_project(output_filename):
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk('.'):
            # Exclude directories
            dirs[:] = [d for d in dirs if d not in ['node_modules', 'dist', '.git', '.idea', '.vscode', 'CinematicPortfolio_FINAL', 'CinematicPortfolio_Code']]
            
            for file in files:
                if file == output_filename or file.endswith('.zip') or file.endswith('.log'):
                    continue
                
                file_path = os.path.join(root, file)
                zipf.write(file_path, arcname=os.path.relpath(file_path, '.'))
                print(f"Added {file_path}")

if __name__ == "__main__":
    zip_project('CinematicPortfolio_FINAL.zip')
