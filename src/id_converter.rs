pub struct IDConverter {
    alphabets: String,
    numbers: String
}

impl IDConverter {
    fn convert_base(input: String, alphabet1: &String, alphabet2: &String) -> String {
        String::new()
    }

    pub fn to_short(&self, input: u64) -> String {
        let input = input.to_string();
        self::IDConverter::convert_base(input, &self.numbers, &self.alphabets)
    }

    pub fn to_number(&self, input: String) -> u64 {
        let output = self::IDConverter::convert_base(input, &self.alphabets, &self.numbers).parse::<u64>().expect("Transformed ID is not a number. Input possibly error/corrupted.");
        output
    }
}