export class CodeService {
  /**
   * Replaces the following characters with their HTML character sequences:
   * `&`, `<`, `>`
   * @param html A string containing valid HTML. For example: `<p>Hello world!</p>`.
   * @returns A string with all HTML characters encoded. For example: `&lt;p&gt;Hello world!&lt;/p&gt;`.
   */
  public static encodeHTML(html: string): string {
    return html
      .replaceAll(/&/gi, "&amp;")
      .replaceAll(/</gi, "&lt;")
      .replaceAll(/>/gi, "&gt;");
  }

  /**
   * Replaces the following HTML character sequences with a character:
   * `&amp;`, `&lt;`, `&gt;`
   * @param html A string containing encoded HTML. For example: `&lt;p&gt;Hello world!&lt;/p&gt;`.
   * @returns A string with all HTML character sequences decoded. For example: `<p>Hello world!</p>`.
   */
  public static decodeHTML(html: string): string {
    return html
      .replaceAll(/&amp;/gi, "&")
      .replaceAll(/&lt;/gi, "<")
      .replaceAll(/&gt;/gi, ">");
  }
}
