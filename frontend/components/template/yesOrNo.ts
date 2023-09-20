// referencing defaults in https://cookiecutter.readthedocs.io/en/2.3.0/cookiecutter.html#cookiecutter.prompt.YesNoPrompt
import { CutterOption } from 'lib/client';

export const TRUTHY_DEFAULTS = ['1', 'true', 't', 'yes', 'y', 'on'];
export const FALSY_DEFAULTS = ['0', 'false', 'f', 'no', 'n', 'off'];

export const attemptDetermineYesNoOptions = (
    options: CutterOption[]
):
    | {
          truthy: string;
          falsy: string;
      }
    | false => {
    if (options.length !== 2) {
        return false;
    }

    // do not use a checkbox if the select options have a label because context may ge tlost
    if (options.some((o) => o.prompt != null)) {
        return false;
    }

    // ensure alphabetical order in checks!
    const [first, second] = options.map((o) => o.name).sort();

    if (
        (first === '0' && second === '1') ||
        (first === 'false' && second === 'true') ||
        (first === 'f' && second === 't') ||
        (first === 'no' && second === 'yes') ||
        (first === 'n' && second === 'y') ||
        (first === 'off' && second === 'on')
    ) {
        return {
            truthy: second,
            falsy: first,
        };
    }

    return false;
};
