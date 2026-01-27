import re

# Read the current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original file length: {len(content)} characters")
print(f"Original line count: {content.count(chr(10))} lines")

# Find and remove the chatbot <style> block in the body
# Pattern: From <!--Mobile-Style Custom CSS--> or similar comment through </style>
pattern_css = r'<!--[^>]*Mobile-Style[^>]*-->\s*<style>[\s\S]*?</style>'
content_after_css = re.sub(pattern_css, '', content, count=1)

if len(content_after_css) < len(content):
    print(f"✓ Removed CSS block: {len(content) - len(content_after_css)} characters")
    content = content_after_css
else:
    print("⚠ CSS block not found with first pattern, trying alternative...")
    # Try alternative pattern
    pattern_css2 = r'<style>\s*/\*[^*]*Mobile[^*]*\*/[\s\S]*?</style>'
    content_after_css = re.sub(pattern_css2, '', content, count=1)
    if len(content_after_css) < len(content):
        print(f"✓ Removed CSS block: {len(content) - len(content_after_css)} characters")
        content = content_after_css

# Find and remove the chatbot <script> block in the body (but NOT in head)
# We need to be careful to only remove the duplicate one
pattern_script = r'<script>\s*const knowledge[\s\S]*?</script>\s*(?=<!--[^>]*Chatbot HTML[^>]*-->)'
content_after_script = re.sub(pattern_script, '', content, count=1)

if len(content_after_script) < len(content):
    print(f"✓ Removed JavaScript block: {len(content) - len(content_after_script)} characters")
    content = content_after_script
else:
    print("⚠ JavaScript block not found - may already be removed")

print(f"Final file length: {len(content)} characters")
print(f"Final line count: {content.count(chr(10))} lines")

# Write the fixed content
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Fixed! The chatbot HTML elements are preserved, only CSS/JS text removed.")
