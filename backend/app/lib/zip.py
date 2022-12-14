import os
import pathlib
import typing
import zipfile

from ..settings import ZIP_NAME


def zip_folder_to_buffer(path: typing.Union[str, pathlib.Path], filename=ZIP_NAME + ".zip") -> str:
    zip_handle = zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED)
    for root, dirs, files in os.walk(path):
        for file in files:
            zip_handle.write(os.path.join(root, file),
                             os.path.relpath(os.path.join(root, file),
                                             os.path.join(path, '..')))

    return filename
