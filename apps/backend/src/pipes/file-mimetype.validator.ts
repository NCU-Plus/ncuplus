import { FileValidator } from '@nestjs/common';
import { fromFile } from 'file-type';

export interface FileMimetypeValidatorOptions {
  acceptedMimetypes: string[];
}

export class FileMimetypeValidator extends FileValidator<FileMimetypeValidatorOptions> {
  buildErrorMessage(): string {
    return `Validation failed (expected type are ${this.validationOptions.acceptedMimetypes.join(
      ', ',
    )})`;
  }

  async isValid(file: any): Promise<boolean> {
    if (!this.validationOptions) {
      return true;
    }

    const filetype = await fromFile(file.path);
    if (!filetype || !filetype.mime) {
      return false;
    }

    for (const mimetype of this.validationOptions.acceptedMimetypes) {
      if (!filetype.mime.match(mimetype)) return true;
    }
    return false;
  }
}
