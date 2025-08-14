class StringElot743ManipulationService {


    convertGreekToEnglishELOT743(str: string): string {

        str = this.convertStringToUpperCaseCustomGREEK(str).toLowerCase();

        const grCaps = this.stringToSet('ΑΆΒΓΔΕΈΖΗΉΘΙΊΪΚΛΜΝΞΟΌΠΡΣΤΥΎΫΦΧΨΩΏ');
        const replacements = [
            { greek: 'αι', greeklish: 'ai' },
            { greek: 'αί', greeklish: 'ai' },
            { greek: 'οι', greeklish: 'oi' },
            { greek: 'οί', greeklish: 'oi' },
            { greek: 'ου', greeklish: 'ou' },
            { greek: 'ού', greeklish: 'ou' },
            { greek: 'ει', greeklish: 'ei' },
            { greek: 'εί', greeklish: 'ei' },
            { greek: 'αυ', fivi: 1 },
            { greek: 'αύ', fivi: 1 },
            { greek: 'ευ', fivi: 1 },
            { greek: 'εύ', fivi: 1 },
            { greek: 'ηυ', fivi: 1 },
            { greek: 'ηύ', fivi: 1 },
            { greek: 'ντ', greeklish: 'nt' },
            { greek: 'μπ', bi: 1 },
            { greek: 'τσ', greeklish: 'ts' },
            { greek: 'τς', greeklish: 'ts' },
            { greek: 'ΤΣ', greeklish: 'ts' },
            { greek: 'τζ', greeklish: 'tz' },
            { greek: 'γγ', greeklish: 'ng' },
            { greek: 'γκ', greeklish: 'gk' },
            { greek: 'θ', greeklish: 'th' },
            { greek: 'χ', greeklish: 'ch' },
            { greek: 'ψ', greeklish: 'ps' },
            { greek: 'γχ', greeklish: 'nch' },
            { greek: 'γξ', greeklish: 'nx' },
        ];


        // Remove extraneus array element
        if (!replacements[replacements.length - 1]) replacements.pop();

        // Enchance replacements
        for (let i = 0, replacement; replacement = replacements[i]; i++)
            replacements[replacement.greek] = replacement;


        // Append single letter replacements
        const grLetters = 'αάβγδεέζηήθιίϊΐκλμνξοόπρσςτυύϋΰφχψωώ';
        const engLetters = 'aavgdeezii.iiiiklmnxooprsstyyyyf..oo';
        for (let i = 0; i < grLetters.length; i++)
            if (!replacements[grLetters.charAt(i)])
                replacements.push({ greek: grLetters.charAt(i), greeklish: engLetters.charAt(i) });


        // Enchance replacements, build expression
        let expression: any = [];
        for (let i = 0, replacement; replacement = replacements[i]; i++) {
            replacements[replacement.greek] = replacement;
            expression[i] = replacement.greek;
        }
        expression = new RegExp(expression.join('|'), 'gi');

        // Replace greek with greeklsh
        const greekSet = this.stringToSet(grLetters);
        const viSet = this.stringToSet('αβγδεζηλιmμνορω');
        str = str.replace(expression, ($0, index) => {
            const replacement = replacements[$0.toLowerCase()];
            if (replacement.bi) {
                const bi = (greekSet[str.charAt(index - 1).toLowerCase()] && greekSet[str.charAt(index + 2).toLowerCase()]) ? 'mp' : 'b';
                return this.fixCase(bi, $0, grCaps);
            } else if (replacement.fivi) {
                const c1 = replacements[$0.charAt(0).toLowerCase()].greeklish;
                const c2 = viSet[str.charAt(index + 2).toLowerCase()] ? 'v' : 'f';
                return this.fixCase(c1 + c2, $0, grCaps);
            } else
                return this.fixCase(replacement.greeklish, $0 + str.charAt(index + $0.length), grCaps);
        });


        return str.toUpperCase().trim();

    }


    convertStringToUpperCaseCustomGREEK(str: string): string {

        str = str.toUpperCase();

        const letters = {
            'Ά': 'Α',
            'Έ': 'Ε',
            'Ή': 'Η',
            'Ί': 'Ι',
            'Ό': 'Ο',
            'Ύ': 'Υ',
            'Ώ': 'Ω',
        };


        let new_str = '';
        for (const letter of str)
            new_str += (letters.hasOwnProperty(letter)) ? letters[letter] : letter;

        return new_str.trim();

    }


    stringToSet(s: string) {
        const o = {};
        for (let i = 0; i < s.length; i++)
            o[s.charAt(i)] = 1;

        return o;
    }



    fixCase(text: string, mirror: string, grCaps: any) {
        if (grCaps[mirror.charAt(0)])
            if (mirror.length === 1 || grCaps[mirror.charAt(1)])
                return text.toUpperCase();
            else
                return text.charAt(0).toUpperCase() + text.substr(1);
        else
            return text;
    }


}




export const stringElot743ManipulationService = new StringElot743ManipulationService();
