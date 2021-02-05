import { CopyDirectoryOptions, CreateDirectoryOptions, MoveDirectoryOptions, StorageResponse } from '../types';
import { AbstractFile } from './abstract.file';
import { IDirectory } from './file.interface';
import pt from 'path';

export class Directory extends AbstractFile implements IDirectory {

    public async copy(dest: string | IDirectory, options?: CopyDirectoryOptions): Promise<StorageResponse<Directory>> {
        options = options || {};
        options.returning = true;
        return this.bucket.copyDirectory<Directory>(this, dest, options);
    }

    public async save(): Promise<StorageResponse<Directory>> {
        return this.bucket.makeDirectory<Directory>(this, { returning: true });
    }

    public async empty(): Promise<StorageResponse<boolean>> {
        return this.bucket.emptyDirectory(this);
    }

    public async move(dest: string | IDirectory, options?: MoveDirectoryOptions): Promise<StorageResponse<Directory>> {
        options = options || {};
        options.returning = true;
        return this.bucket.moveDirectory<Directory>(this, dest, options);
    }


    public async makeDirectory(dest: string | IDirectory, options?: CreateDirectoryOptions): Promise<StorageResponse<Directory>> {
        const parsed = this.parseDirectorySrc(dest, options);
        return this.bucket.makeDirectory<Directory>(parsed.src, parsed.options);
    }

    protected parseDirectorySrc(src: string | IDirectory, options?: any): { src: string | IDirectory; options: any } {
        if (typeof (src) === 'string') {
            src = pt.join(this.getAbsolutePath(), src);
        } else {
            src.path = this.getAbsolutePath();
        }
        options = options || {};
        options.returning = true;

        return { src, options };
    }

}
